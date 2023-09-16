import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen, act, waitFor } from "@testing-library/react";
import Homepage from "../components/Homepage";
import ThemeContext from "../contexts/ThemeContext";
import UserContext from "../contexts/UserContext";

const mockBlogposts = [
  {
    _id: "1",
    title: "First Post",
    text: "This is a longer text for the first post.",
    topic: { title: "Beach" },
    user: { _id: "user1", username: "John" },
    timestamp: "2023-08-01T12:00:00Z",
  },
  {
    _id: "2",
    title: "Second Post",
    text: "This is another longer text for the second post.",
    topic: { title: "City" },
    user: { _id: "user2", username: "Jane" },
    timestamp: "2023-08-02T12:00:00Z",
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockBlogposts),
  }),
);

describe("<Homepage />", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders the component and displays the user's name if logged in", async () => {
    const mockUser = { id: "123", name: "Alice" };
    localStorage.setItem("username", "Alice");
    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeContext.Provider value={{ theme: "light" }}>
            <UserContext.Provider value={{ user: mockUser }}>
              <Homepage />
            </UserContext.Provider>
          </ThemeContext.Provider>
        </MemoryRouter>,
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Welcome to TripTrek, Alice!"),
      ).toBeInTheDocument();
    });
  });

  it("displays blogpost titles and previews correctly", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <ThemeContext.Provider value={{ theme: "light" }}>
            <UserContext.Provider value={{ user: null }}>
              <Homepage />
            </UserContext.Provider>
          </ThemeContext.Provider>
        </MemoryRouter>,
      );
    });
    await waitFor(() => {
      expect(screen.getByText("First Post").closest("a")).toHaveAttribute(
        "href",
        "/blogposts/1",
      );
    });
    expect(
      screen.getByText(/This is a longer text for the first post./i),
    ).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();

    expect(await screen.findByText("Second Post")).toBeInTheDocument();
    expect(
      screen.getByText(/This is another longer text for the second post./i),
    ).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  it("has clickable links to different parts of the app", () => {
    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme: "light" }}>
          <UserContext.Provider value={{ user: null }}>
            <Homepage />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </MemoryRouter>,
    );

    expect(
      screen
        .getByText(
          "Explore your dream destinations, delve into unique cultures, and find your next adventure.",
        )
        .closest("a"),
    ).toHaveAttribute("href", "/topics");
    expect(
      screen.getByText("Click here for the latest blogposts!").closest("a"),
    ).toHaveAttribute("href", "/blogposts");
    expect(screen.getByText("First Post").closest("a")).toHaveAttribute(
      "href",
      "/blogposts/1",
    );
    expect(screen.getByText("Second Post").closest("a")).toHaveAttribute(
      "href",
      "/blogposts/2",
    );
    expect(
      screen
        .getByText(
          "Discover the world with TripTrek! Sign up today to join our vibrant community of travelers and unlock exclusive features and insights tailored just for you. Dive in and start your journey!",
        )
        .closest("a"),
    ).toHaveAttribute("href", "/authenticate");
  });
});
