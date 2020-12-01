import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import Login from "../components/Login/Login";

// tests for the Login component
describe("<Login /> testing suite", () => {
  // renders the Login component
  test("Renders the 'Log In' page", async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Route path="/login">
          <Login />
        </Route>
      </MemoryRouter>
    );

    // check that the form components render on screen
    expect(wrapper.getByTestId("login-email").placeholder).toEqual("Email");
    expect(wrapper.getByText(/Don't have an account?/i)).toBeInTheDocument();
  });

  // user can properly log in
  test("User can log in successfully", async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Route path="/login">
          <Login />
        </Route>
      </MemoryRouter>
    );

    // grab the form inputs
    const email = wrapper.getByTestId("login-email");
    const password = wrapper.getByTestId("login-password");

    // fill in the form inputs
    fireEvent.change(email, { target: {value: "test@gmail.com"} });
    fireEvent.change(password, { target: {value: "pass"} });
    
    // verify the correct data is in the correct input field
    expect(email.value).toBe("test@gmail.com");
    expect(password.value).toBe("pass");

    // submit the user data
    fireEvent.click(wrapper.getByTestId("login-submit"));
    
    // verify the user is logging in -> login button becomes loading state
    await waitForElementToBeRemoved(() =>wrapper.getByTestId("login-submit"));
  });

  // login form displays validation errors correctly
  test("Login form validation errors show correctly", async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Route path="/login">
          <Login />
        </Route>
      </MemoryRouter>
    );

    // attempt to submit form without data input
    fireEvent.click(wrapper.getByTestId("login-submit"));
    
    // verify that the form validation works & shows errors
    await waitFor(() => expect(wrapper.getByText(/Please input your email/i)).toBeInTheDocument());
    await waitFor(() => expect(wrapper.getByText(/Please enter a password/i)).toBeInTheDocument());
  });
});

