import React from "react";
import { Form, Input, Button, Divider } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const SurveyQuestions = props => {
  return (
    <div>
      <Divider>Survey Questions</Divider>

      <p>Select questions you would like your team members to answer.</p>

      <Form.List name="surveyQuestions">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div key={index}>
                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "topic_id"]}
                    initialValue={props.topic.id}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "style"]}
                    initialValue={"Text"}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "default"]}
                    initialValue={false}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "type"]}
                    initialValue={"request"}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="new-topic-question"
                    validateTrigger={["onChange", "onBlur"]}
                    name={[field.name, "question"]}
                    label={`Survey Question ${index + 1}`}
                    rules={[{ required: true, message: "The survey question is required." }]}
                    initialValue={""}
                  >
                    <Input.TextArea autoSize={{ minRows: 1}} placeholder={"Ex: What did you work on today?"} />
                  </Form.Item>

                  {fields.length >= 1 ? (
                    <Button
                      className="remove-question-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      <p>
                        <DeleteOutlined /> Delete
                      </p>
                    </Button>
                  ) : null}
                </div>
              ))}

              <Form.Item>
                <Button
                  block
                  className="add-question-button"
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> Add Survey Question
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

export default SurveyQuestions;