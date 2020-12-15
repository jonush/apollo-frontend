import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { fireEvent, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import SignUp from "../components/SignUp/SignUp";

// tests for the SignUp component
describe("<SignUp /> testing suite", () => {
  // renders the Sign Up page
  test("Renders the 'Sign Up' page", async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route path="/signup">
          <SignUp />
        </Route>
      </MemoryRouter>
    );

    // check that the form components render on screen
    expect(wrapper.getByTestId("signup-first-name").placeholder).toEqual("First Name");
    expect(wrapper.getByText("Already have an account?")).toBeInTheDocument();
  });

  // user can properly sign up
  test("User can sign up successfully", async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route path="/signup">
          <SignUp />
        </Route>
      </MemoryRouter>
    );

    // grab the form inputs
    const firstName = wrapper.getByTestId("signup-first-name");
    const lastName = wrapper.getByTestId("signup-last-name");
    const password = wrapper.getByTestId("signup-password");
    const email = wrapper.getByTestId("signup-email");

    // fill in the form inputs
    fireEvent.change(firstName, { target: {value: "Test"} });
    fireEvent.change(lastName, { target: {value: "User"} });
    fireEvent.change(password, { target: {value: "pass"} });
    fireEvent.change(email, { target: {value: "test@gmail.com"} });
    
    // verify the correct data is in the correct input field
    expect(firstName.value).toBe("Test");
    expect(lastName.value).toBe("User");
    expect(password.value).toBe("pass");
    expect(email.value).toBe("test@gmail.com");

    // submit the user data
    fireEvent.click(wrapper.getByTestId("sign-up-submit"));
    
    // verify the user is signing up -> sign up button becomes loading state
    await waitForElementToBeRemoved(() => wrapper.getByTestId("sign-up-submit"));
  });

  // sign up form validation works correctly
  test("Sign Up form has functioning form validation", async () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Route path="/signup">
          <SignUp />
        </Route>
      </MemoryRouter>
    );

    // attempt to submit form without data input
    fireEvent.click(wrapper.getByTestId("sign-up-submit"));
    
    // verify that the form validation works & shows errors
    await waitFor(() => expect(wrapper.getByText(/Please input your first name/i)).toBeInTheDocument());
    await waitFor(() => expect(wrapper.getByText(/Please input your last name/i)).toBeInTheDocument());
    await waitFor(() => expect(wrapper.getByText(/Please enter a password/i)).toBeInTheDocument());
    await waitFor(() => expect(wrapper.getByText(/Please input your email/i)).toBeInTheDocument());
  });
});

