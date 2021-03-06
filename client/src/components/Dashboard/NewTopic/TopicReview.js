import React, { useState, useEffect } from "react";
import { Form, Input, Divider } from "antd";

const TopicReview = ({ form, page }) => {
  const [review, setReview] = useState(form.getFieldsValue());
  
  useEffect(() => {
    if(page === 3) {
      setReview(form.getFieldsValue());
      console.log(form.getFieldsValue());
    }
  }, [page, review.surveyQuestions]);

  return (
    <div className="review">
      <Divider>Review</Divider>

      <div className="review-topic">
        <div>
          <h4>Title</h4>
          <h3>{review.topic && review.topic.title !== undefined ? review.topic.title : "None"}</h3>
        </div>

        <div>
          <h4>Frequency</h4>
          <h3>{review.topic && review.topic.frequency !== undefined ? review.topic.frequency : "None"}</h3>
        </div>
      </div>

      <div className="review-questions">
        <div className="review-context">
          <h4>Context Questions</h4>
          {review.topic && review.contextQuestions !== undefined ? review.contextQuestions.map((q, index) => {
            return (
              <div key={index}>
                <h3>{index + 1}. {q.question}</h3>
              </div>
            );
          }) : <h3>None</h3>}
        </div>

        <div className="review-survey">
          <h4>Survey Questions</h4>
          {review.topic && review.surveyQuestions !== undefined ? review.surveyQuestions.map((q, index) => {
            return (
              <div key={index}>
                <h3>{index + 1}. {q.question}</h3>
              </div>
            );
          }) : <h3>None</h3>}
        </div>
      </div>
    </div>
  );
};

export default TopicReview;