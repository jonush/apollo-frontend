import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../state/actions/fetchSurveys";
import Moment from "react-moment";
import { Button, Select, message } from "antd";

const MainTopic = (props) => {
  const { Option } = Select;

  useEffect(() => {
    props.fetchSurveys(props.topic.id);
  }, []);

  const copyJoinCode = () => {
    navigator.clipboard.writeText(props.topic.join_code)
    message.info('Copied Join Code');
  };

  return (
    <div className="topic">
      <h2 className="topic-title">{props.topic.title}</h2>
      <h4 className="join-code" onClick={() => {copyJoinCode()}}>JOIN CODE: {props.topic.join_code}</h4>

      <div className="survey-list">
        <Button type="primary" block>New Survey</Button>

        <Select className="survey-dropdown" placeholder="Select a survey">
          {props.surveys.map((survey, index) => {
            return (
              <Option key={index} value={survey.id}>
                <Moment date={survey.created_at} format="LL" />
              </Option>
            )
          })}
        </Select>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.surveysList.isFetching,
    surveys: state.surveysList.surveys,
    errors: state.surveysList.errors
  }
};

export default connect(mapStateToProps, {fetchSurveys})(MainTopic);