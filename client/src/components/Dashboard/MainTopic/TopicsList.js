import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopics } from "../../../state/actions/fetchTopics";
import { getTopicByLeaderID, getTopicsByUserID } from "../../../api/topics";

export const TopicsList = props => {
  const userID = parseInt(localStorage.getItem("userID"));
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    props.refreshTopics(false);

    getTopicsByUserID(userID)
      .then(userTopics => {
        getTopicByLeaderID(userID)
          .then(leaderTopics => {
            let tempTopics = userTopics.concat(leaderTopics);
            setTopics(tempTopics);
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [props.refreshTopics])

  return (
  <div className="topics-list">
      {
        topics ? topics.map((topic, index) => {
          return (
            <h3
              data-testid={`topic-${index + 1}`}
              key={index}
              className={props.currentID === topic.id ? "topic-circle selected-topic" : "topic-circle"}
              //style={topic.leader_id === userID ? {border: "2px solid pink"} : null}
              onClick={() => {props.viewTopic(topic)}}
            >
              {index + 1}
            </h3>
          )
        }) : null
      }
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.topicsList.isFetching,
    topics: state.topicsList.topics,
    errors: state.topicsList.errors
  }
};

export default connect(mapStateToProps, {fetchTopics})(TopicsList);