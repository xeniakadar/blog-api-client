import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // because we use the Link component
import PostShort from "../components/PostShort";
import ThemeContext from "../contexts/ThemeContext";

describe("PostShort Component", () => {
  const mockProps = {
    title: "Test Title",
    text: "This is a test post with more than 200 characters...",
    username: "testUser",
    timestamp: "2023-01-01T10:00:00Z",
    topic: "Beach",
    blogpostId: "1",
    userId: "2",
    topicId: "1",
  };

  test("renders the component with content", () => {
    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme: "dark" }}>
          <PostShort {...mockProps} />
        </ThemeContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText(mockProps.title.toUpperCase())).toBeInTheDocument();
    const userLink = screen.getByRole("link", { name: mockProps.username }); // Use getByRole to get the link by its accessible name
    expect(userLink).toBeInTheDocument();
    expect(userLink).toHaveAttribute("href", `/users/${mockProps.userId}`);
  });

  test("shows PostDropdown if currentUser matches userId", () => {
    localStorage.setItem("userId", mockProps.userId);

    render(
      <MemoryRouter>
        <ThemeContext.Provider value={{ theme: "light" }}>
          <PostShort {...mockProps} />
        </ThemeContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument(); // assuming PostDropdown has a button

    localStorage.removeItem("userId");
  });
});
