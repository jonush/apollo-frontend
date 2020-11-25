import React from "react";
import { Form, Input, Divider } from "antd";

const SurveyContextR = ({ form }) => {
  let contextQuestions = form.getFieldsValue().contextQuestions;
  const userID = parseInt(localStorage.getItem("userID"));

  return (
    <div>
      <Divider>Context Responses</Divider>

      <p>Answer your context questions here.</p>

      {contextQuestions
        ? contextQuestions.map((q, index) => {
            return (
              <div className="context-response" key={`cR-${index}`}>
                <Form.Item
                  className="closed"
                  name={["contextResponses", index, "survey_id"]}
                  initialValue={null}
                />

                <Form.Item
                  className="closed"
                  name={["contextResponses", index, "user_id"]}
                  initialValue={userID}
                />

                <Form.Item
                  className="closed"
                  name={["contextResponses", index, "question"]}
                  initialValue={q.question}
                />

                <Form.Item
                  className="closed"
                  name={["contextResponses", index, "style"]}
                  initialValue={q.style}
                />

                <Form.Item
                  name={["contextResponses", index, "response"]}
                  label={q.question}
                  initialValue={""}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SurveyContextR;