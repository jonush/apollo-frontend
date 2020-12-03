import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, waitFor, render } from "@testing-library/react";
import Dashboard from "../components/Dashboard/Dashboard";
import JoinTopic from "../components/Dashboard/JoinTopic";
import TopicsList from "../components/Dashboard/MainTopic/TopicsList";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux"
import thunk from "redux-thunk";

const mockStore = configureMockStore([thunk]);

// tests for the Dashboard component
describe("<Dashboard /> testing suite", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      topicsList: {
        isFetching: false,
        topics: [],
        errors: "",
      }
    })
  })

  // renders the 'Dashboard' component
  test("renders the dashboard and topics list", async () => {
    const wrapper = render(
      <Provider store={store}>
        <Router>
          <Dashboard>
            <JoinTopic />
            <TopicsList />
          </Dashboard>
        </Router>
      </Provider>,
    );
    
    expect(wrapper.getByTestId("join-topic-btn")).toBeInTheDocument();
    await waitFor(() => fireEvent.click(wrapper.getByTestId("join-topic-btn")));
    expect(wrapper.getByTestId("join-topic-form")).toBeInTheDocument();
  })
})
