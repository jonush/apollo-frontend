import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchResponses, resetResponses } from "../../../state/actions/fetchResponses";
import Moment from "react-moment";

const Responses = props => {
  const [ replies, setReplies ] = useState([]);
  
  // resets the responses when selecting a different topic
  useEffect(() => {
    props.resetResponses();
  }, [props.topic.id])

  // fetches all responses to a survey after selecting a survey
  useEffect(() => {
    if(props.survey.id) {
      props.fetchResponses(props.survey.id);
    };
  }, [props.survey]);

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

  return (
    <>
      {
        props.survey.id ? 
        <div className="responses-list">
          <h3><Moment date={props.survey.created_at} format="LL" /></h3>

          {
            Object.keys(replies).map((r, index) => (
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
            ))
          }
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
  }
};

export default connect(mapStateToProps, {
  fetchResponses,
  resetResponses,
})(Responses);