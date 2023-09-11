import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginSignup from '../components/LoginSignup';
import UserContext from '../contexts/UserContext';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock;

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

describe('<LoginSignup />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const mockSetUser = jest.fn();
    render(
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <LoginSignup />
      </UserContext.Provider>
    );
  });

  it('shows error when password does not meet criteria', async () => {
    const mockSetUser = jest.fn();
    render(
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <LoginSignup />
      </UserContext.Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'abc' } });

    await waitFor(() => {
      expect(screen.getByText("Password must contain at least 1 capital letter, 1 number and must be at least 6 characters long")).toBeInTheDocument();
    });
});

  it('calls register API on registration', async () => {
    const mockSetUser = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <UserContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <LoginSignup />
      </UserContext.Provider>
    );

    fireEvent.click(getByText('Sign Up'));

    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const createAccountButton = getByText('Create Account');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Test123' } });
    fireEvent.click(createAccountButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("https://blog-api-production-c42d.up.railway.app/api/register", expect.any(Object));
    });
  });

});
