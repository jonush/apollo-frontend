import React from "react";
import { BrowserRouter, Route, MemoryRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import Welcome from "../components/Welcome/Welcome";

// renders the Welcome page of Apollo
describe("<Welcome /> testing suite", () => {
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
})