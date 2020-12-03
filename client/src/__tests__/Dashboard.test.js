import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, waitFor, render } from "@testing-library/react";
import Dashboard from "../components/Dashboard/Dashboard";
import JoinTopic from "../components/Dashboard/JoinTopic";
import TopicsList from "../components/Dashboard/MainTopic/TopicsList";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux"
import thunk from "redux-thunk";
import { getTopics } from "../api/topics";

const mockStore = configureMockStore([thunk]);

localStorage.setItem("userID", 5);

// tests for the Dashboard component
describe("<Dashboard /> testing suite", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      topicsList: {
        isFetching: false,
        topics: [{
          "id": 1,
          "title": "Stand Up",
          "frequency": "Daily",
          "join_code": "K6C8XY",
          "leader_id": 1,
          "created_at": "2020-11-03 23:33:47",
          "updated_at": "2020-11-03 23:33:47"
        },],
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
          </Dashboard>
        </Router>
      </Provider>,
    );
    
    expect(wrapper.getByTestId("join-topic-btn")).toBeInTheDocument();
  })
})
