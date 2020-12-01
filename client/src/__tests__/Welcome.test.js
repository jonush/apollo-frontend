import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import Welcome from "../components/Welcome/Welcome";

// tests for the Welcome component
describe("<Welcome /> testing suite", () => {
  // renders the Welcome page of Apollo
  test("Renders the 'Welcome' page", async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </MemoryRouter>
    );

    // check for the CTA message
    let intro = getByText(/Automate your stand ups/i);
    expect(intro).toBeInTheDocument();

    // renders the 'Get Started' button
    let ctaButton = getByText(/Get Started/i);
    expect(ctaButton).toBeInTheDocument();
  })

  // 'Get Started' buttons routes to 'Sign Up' page properly
  test("'Get Started' button routes to 'Sign Up' page", async () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>
      </MemoryRouter>
    );

    // check if 'Get Started' button redirects to 'Sign Up' component
    const ctaButton = getByTestId("cta-button");
    fireEvent.click(ctaButton);
    expect(global.window.location.pathname).toEqual('/signup');
  })

  // 'Sign Up' nav link routes to 'Sign Up' page properly
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
  
  // 'Log In' nav link routes to 'Login' page properly
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