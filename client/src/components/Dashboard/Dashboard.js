import React, { useState }  from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import TopicsList from "./MainTopic/TopicsList";
import MainTopic from "./MainTopic/MainTopic";
import NewTopic from "./NewTopic/NewTopic";

const Dashboard = () => {
  const [topic, setTopic] = useState();
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  const viewTopic = topic => {
    setTopic(topic);
  };

  const refreshTopics = refresh => {
    // refreshes the topic list upon creating a new topic
    setRefresh(refresh);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="dashboard">
      {/* the topics list */}
      <TopicsList
        currentID={topic ? topic.id : null}
        viewTopic={viewTopic}
        refresh={refresh}
        refreshTopics={refreshTopics}
      />

      <div className="main-topic">
        {/* buttons for creating topics, joining topics, and logging out */}
        <div className="topic-nav">
          <h3>Apollo</h3>

          <div className="topic-buttons">
            <NewTopic refreshTopics={refreshTopics} />
            <Button type="secondary">Join Topic</Button>
          </div>

          <h4 onClick={() => {logOut()}}><Link to="/">Logout</Link></h4>
        </div>

        {/* the main topic: includes surveys and responses */}
        { topic ? <MainTopic topic={topic} /> : <p>Select a topic from the topics list on the left 😀</p> }
      </div>

    </div>
  );
};

export default Dashboard;