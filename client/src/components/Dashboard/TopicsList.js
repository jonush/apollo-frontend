import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopics } from "../../state/actions/fetchTopics";

const TopicsList = props => {
  useEffect(() => {
    props.fetchTopics()
  }, [])

  return (
  <div className="topics-list">
      {
        props.topics ? props.topics.map((topic, index) => {
          return (
            <h3
              className={props.currentID === topic.id ? "topic-circle selected-topic" : "topic-circle"}
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