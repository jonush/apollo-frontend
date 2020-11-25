import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ResponseForm from "./ResponseForm";
import { fetchResponses, resetResponses } from "../../../state/actions/fetchResponses";
import { fetchSurveyQuestions, resetSurveyQuestions } from "../../../state/actions/fetchSurveyQuestions";
import Moment from "react-moment";

const Responses = props => {
  const [ replies, setReplies ] = useState([]);
  const [refreshResponses, setRefreshResponses] = useState(false);
  const [userResponded, setUserResponded] = useState(false);
  const userID = parseInt(localStorage.getItem("userID"));
  
  // resets the responses when selecting a different topic
  useEffect(() => {
    props.resetResponses();
  }, [props.topic.id])

  // fetches all responses to a survey after selecting a survey
  useEffect(() => {
    if(props.survey.id) {
      props.fetchResponses(props.survey.id);
      props.fetchSurveyQuestions(props.survey.id);
    };
  }, [props.survey, refreshResponses]);

  // if the user has responded or is the leader of the topic, hide the respond button
  useEffect(() => {
    checkResponses();
  }, [props.responses, props.survey.id, props.topic.id]);

  // filter responses by user
  useEffect(() => {
    setReplies(groupByUser(props.responses, 'first_name'));
  }, [props.survey, props.responses]);

  // function for grouping responses by user
  const groupByUser = (array, key) => {
    return array.filter(res => res.type !== "context").reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  // check if the user has already responded, or is the topic leader
  const checkResponses = () => {
    setUserResponded(false);
    for(let i = 0; i < props.responses.length; i++) {
      console.log("ACCESSED");
      if(props.responses[i].user_id === userID || userID === props.topic.leader_id) {
        setUserResponded(true);
        console.log(true);
        break
      }
    }

    // if there are no responses yet
    if(props.responses.length < 1 && userID === props.topic.leader_id) {
      setUserResponded(true);
    }
  };

  // refresh the list of responses after the user responds
  const refresh = () => {
    setRefreshResponses(true);
  };

  return (
    <>
      {
        // if a survey is selected, show the responses (if any)
        props.survey.id ? 
        <div>
          <h3><Moment date={props.survey.created_at} format="LL" /></h3>

          <div className="responses-list">
            {
              // if there are responses to the survey questions, show them
              props.responses.filter(r => r.type === "request").length > 0 ? Object.keys(replies).map((r, index) => (
                <div className="response" key={index}>
                  <h4 style={{color: "#7000FF"}}>{r}</h4>

                  {
                    replies[r].map((reply, index) => (
                      <div key={index}>
                        <h4>{reply.question}</h4>
                        <p>{reply.response}</p>
                      </div>
                    ))
                  }
                </div>
              )) : // otherwise, show the survey request questions
              <div>
                {
                  props.surveyQuestions.filter(q => q.type === "request").map((sQ, index) => {
                    return (
                      <div className="response" key={index} >
                        <h4>{sQ.question}</h4>
                        <p>There are no responses yet.</p>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>

          {/* show the respond button if user has not responded yet AND there are survey questions to answer */}
          { !userResponded && props.surveyQuestions.filter(q => q.type === "request").length > 0 ? 
            <ResponseForm
              topic={props.topic}
              survey={props.survey}
              questions={props.surveyQuestions}
              refresh={refresh}
            /> : null }
        </div> : null
      }
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.responsesList.isLoading,
    responses: state.responsesList.responses,
    errors: state.responsesList.errors,
    isFetching: state.surveyQuestionsList.isFetching,
    surveyQuestions: state.surveyQuestionsList.surveyQuestions,
    errors: state.surveyQuestionsList.errors,
  }
};

export default connect(mapStateToProps, {
  fetchResponses,
  resetResponses,
  fetchSurveyQuestions,
  resetSurveyQuestions,
})(Responses);