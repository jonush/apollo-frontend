import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../state/actions/fetchSurveys";
import { fetchResponses } from "../../state/actions/fetchResponses";
import Responses from "./Responses";
import Moment from "react-moment";
import { Button, Select, message } from "antd";

const MainTopic = (props) => {
  const [survey, setSurvey] = useState({});
  const { Option } = Select;

  useEffect(() => {
    props.fetchSurveys(props.topic.id);
    props.fetchResponses(survey.id);
  }, [survey.id]);

  const copyJoinCode = () => {
    navigator.clipboard.writeText(props.topic.join_code)
    message.info('Copied Join Code');
  };

  const selectSurvey = surveyID => {
    let mainSurvey = props.surveys.filter(s => s.id === surveyID)[0];
    setSurvey(mainSurvey);
  };

  return (
    <div className="main-topic-container">
      <div className="topic-container">
        <h2 className="topic-title">{props.topic.title}</h2>
        <h4 className="join-code" onClick={() => {copyJoinCode()}}>JOIN CODE: {props.topic.join_code}</h4>

        <div className="survey-list">
          <Button type="primary" block>New Survey</Button>

          <Select onSelect={(s) => {selectSurvey(s)}}className="survey-dropdown" placeholder="Select a survey">
            {props.surveys.map((survey, index) => {
              return (
                <Option key={index} value={survey.id}>
                  <Moment date={survey.created_at} format="LL" />
                </Option>
              )
            })}
          </Select>
        </div>

        {
          survey.id ? 
          <div className="context-container">
            <div className="context">
              <h4>Context</h4>
              <h3>{survey.context}</h3>
            </div>

            {
              props.responses.length > 0 ? props.responses.filter(r => r.type === "context").map((r, index) => {
                return (
                  <div key={index} className="context-question">
                    <h4>{index + 1}. {r.question}</h4>
                    <p>{r.response}</p>
                  </div>
                )
              }) : <p>There are no context responses.</p>
            }
          </div> : null
        }
      </div>

      <div className="responses-container">
        {
          props.responses.length > 0 ? <Responses survey={survey} responses={props.responses} /> : null
        }
        
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.surveysList.isFetching,
    surveys: state.surveysList.surveys,
    errors: state.surveysList.errors,
    isLoading: state.responsesList.isLoading,
    responses: state.responsesList.responses,
    errors: state.responsesList.errors,
  }
};

export default connect(mapStateToProps, {fetchSurveys, fetchResponses})(MainTopic);