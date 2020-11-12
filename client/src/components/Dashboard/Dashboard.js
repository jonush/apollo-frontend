import React, { useState, useEffect }  from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "antd";
import TopicsList from "./TopicsList";
import MainTopic from "./MainTopic";

const Dashboard = () => {
  const [topic, setTopic] = useState();
  const history = useHistory();

  const viewTopic = topic => {
    setTopic(topic)
  };

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="dashboard">
      <TopicsList currentID={topic ? topic.id : null} viewTopic={viewTopic}/>

      <div className="main-topic">
        <div className="topic-nav">
          <h3>Apollo</h3>

          <div className="topic-buttons">
            <Button type="primary">New Topic</Button>
            <Button type="secondary">Join Topic</Button>
          </div>

          <h4 onClick={() => {logOut()}}><Link to="/">Logout</Link></h4>
        </div>

        { topic ? <MainTopic topic={topic} /> : <p>Select a topic from the topics list on the left 😀</p> }
      </div>

    </div>
  );
};

export default Dashboard;