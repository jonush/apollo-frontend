import React, { useState }  from "react";
import { Link, useHistory } from "react-router-dom";
import TopicsList from "./MainTopic/TopicsList";
import MainTopic from "./MainTopic/MainTopic";
import NewTopic from "./NewTopic/NewTopic";
import JoinTopic from "./JoinTopic";

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

  const refreshSurveys = refresh => {
    // refreshes the survey list upon creating a new survey
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
            <JoinTopic refreshSurveys={refreshSurveys}/>
          </div>

          <h4 onClick={() => {logOut()}}><Link to="/">Logout</Link></h4>
        </div>

        {/* the main topic: includes surveys and responses */}
        { 
          topic ? <MainTopic topic={topic} refreshTopics={refreshTopics} /> : <p style={{marginTop: "4rem", width: "20%"}}>Get started by creating a new topic! The topics you are a leader or member of will show up on the left {" "} 😀</p>
        }
      </div>

    </div>
  );
};

export default Dashboard;