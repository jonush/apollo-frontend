import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchResponses, resetResponses } from "../../state/actions/fetchResponses";

const Context = props => {

  // resets the responses when selecting a different topic
  useEffect(() => {
    props.resetResponses();
  }, [props.topic.id])

  // fetching the context responses
  useEffect(() => {
    if(props.survey.id) {
      props.fetchResponses(props.survey.id);
    };
  }, [props.survey])

  return (
    <div>
      {
        props.survey.id ? 
        <div className="context-container">
          <div className="context">
            <h4>Context</h4>
            <h3>{props.survey.context}</h3>
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
})(Context);