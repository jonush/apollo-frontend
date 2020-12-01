import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import Welcome from "../components/Welcome/Welcome";

describe("<NavBar /> testing suite", () => {
  test("'Sign Up' nav link routes to 'Sign Up' page", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </MemoryRouter>
    );
  
    // check if 'Sign Up' nav link redirects to 'Sign Up' component
    const signUpButton = getByTestId("sign-up-btn");
    fireEvent.click(signUpButton);
    expect(global.window.location.pathname).toEqual('/signup');
  })
  
  test("'Log In' nav link routes to 'Login' page", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </MemoryRouter>
    );
  
    // check if 'Log In' nav link redirects to 'Log In' component
    const loginButton = getByTestId("login-btn");
    fireEvent.click(loginButton);
    expect(global.window.location.pathname).toEqual('/login');
  })
})