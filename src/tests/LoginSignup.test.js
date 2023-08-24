import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginSignup from '../components/LoginSignup';
import { loginUser } from './api';
import { BrowserRouter as Router } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';


const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: Router });
};

const customRender = (ui, { route = '/', userValue = {} } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
      <UserContext.Provider value={userValue}>
          <Router>
              {ui}
          </Router>
      </UserContext.Provider>
  );
};


jest.mock('./api');

describe("<LoginSignup />", () => {
  it ("shows error message on failed login", async() => {
    const mockUserValue = {
      user: {},
      setUser: jest.fn()
    }

    // mock failed login
    loginUser.mockResolvedValueOnce({ success: false, message:"Authentication Failed"});

    customRender(<LoginSignup />, {userValue: mockUserValue});

    // fill out form
    userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    userEvent.type(screen.getByLabelText(/password/i), 'testpass');

    //submit
    userEvent.type(screen.getByRole('button', {name: /login/i}));

    const errorMessage = await screen.findByText(/authentication failed/i);
    expect(errorMessage).toBeInTheDocument();
  })
})
