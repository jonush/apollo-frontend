import React, { useState, useEffect } from "react";
import Moment from "react-moment";

const Responses = ({ survey, responses }) => {
  const [ replies, setReplies ] = useState([]);
  // let replies = [];

  useEffect(() => {
      setReplies(groupBy(responses, 'first_name'));
  }, [survey, responses]);

  const groupBy = (array, key) => {
    return array.filter(res => res.type !== "context").reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
      return result;
    }, {});
  };

  return (
    <>
      {
        survey.id ? 
        <div className="responses-list">
          <h3><Moment date={survey.created_at} format="LL" /></h3>

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

export default Responses;