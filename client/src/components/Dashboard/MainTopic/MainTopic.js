import React, { useEffect, useState } from "react";
import SurveysList from "./SurveysList";
import Context from "./Context";
import Responses from "./Responses";
import { message } from "antd";
import NewSurvey from "../NewSurvey/NewSurvey";

const MainTopic = (props) => {
  const [survey, setSurvey] = useState({});

  // clear the survey selection dropdown menu
  useEffect(() => {
    setSurvey({});
  }, [props.topic.id])

  // function for copying join code to the clipboard
  const copyJoinCode = () => {
    navigator.clipboard.writeText(props.topic.join_code)
    message.info('Copied Join Code');
  };

  // set the selected survey to state
  const viewSurvey = survey => {
    setSurvey(survey);
  };

  return (
    <div className="main-topic-container">
      <div className="topic-container">
        <h2 className="topic-title">{props.topic.title}</h2>
        <h4 className="join-code" onClick={() => {copyJoinCode()}}>JOIN CODE: {props.topic.join_code}</h4>

        <div className="survey-list">
          <NewSurvey topic={props.topic} />

          {/* the survey list rendered as a select menu */}
          <SurveysList topic={props.topic} viewSurvey={viewSurvey} />
        </div>

        {/* the context responses */}
        <Context topic={props.topic} survey={survey} />
      </div>

      <div className="responses-container">
        {/* the responses list */}
        <Responses topic={props.topic} survey={survey} />        
      </div>
    </div>
  );
};

export default MainTopic;