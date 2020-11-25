import React, { useState, useEffect } from "react";
import { Divider } from "antd";

const SurveyReview = ({ form, page }) => {
  const [review, setReview] = useState(form.getFieldsValue());

  useEffect(() => {
    if(page === 3) {
      setReview(form.getFieldsValue());
    }
  }, [page]);

  return (
    <div className="review-survey">
      <Divider>Review</Divider>

      <div className="review-questions">
        <div className="review-context">
          <h4>Context Questions</h4>
          {review.contextQuestions !== undefined ? review.contextQuestions.map((q, index) => {
            return (
              <div className="review-question" key={`rCQ-${index}`}>
                <h3 style={{marginRight: ".5rem"}}>{index + 1}.</h3> <h3>{q.question}</h3>
              </div>
            );
          }) : null}
        </div>

        <div className="review-responses">
          <h4>Context Responses</h4>
          {review.contextResponses !== undefined ? review.contextResponses.map((r, index) => {
            return (
              <div className="review-question" key={`rCR-${index}`}>
                <h3 style={{marginRight: ".5rem"}}>{index + 1}.</h3> <h3>{r.response}</h3>
              </div>
            );
          }) : null}
        </div>

        <div className="review-survey-questions">
          <h4>Survey Questions</h4>
          {review.surveyQuestions !== undefined ? review.surveyQuestions.map((q, index) => {
            return (
              <div className="review-question" key={`rSQ-${index}`}>
                <h3 style={{marginRight: ".5rem"}}>{index + 1}.</h3> <h3>{q.question}</h3>
              </div>
            );
          }) : null}
        </div>
      </div>
    </div>
  );
};

export default SurveyReview;