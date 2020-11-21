import React from "react";
import { Form, Input, Select, Button, Divider } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const TopicContextQ = () => {
  const {Option} = Select;
  
  return (
    <div className="context-questions">
      <Divider>Context</Divider>

      <Form.List name="contextQuestions">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <div key={index}>
                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "topic_id"]}
                    initialValue={null}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="closed"
                    name={[field.name, "default"]}
                    initialValue={true}
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
                    name={[field.name, "type"]}
                    initialValue={"context"}
                  ></Form.Item>

                  <Form.Item
                    {...field}
                    className="new-topic-question"
                    validateTrigger={["onChange", "onBlur"]}
                    name={[field.name, "question"]}
                    label={`Context Question ${index + 1}`}
                    rules={[{ required: true, message: "The context question is required." }]}
                    initialValue={""}
                  >
                    <Input.TextArea autoSize={{ minRows: 1}} placeholder={"Ex: What is the current priority?"} />
                  </Form.Item>

                  {fields.length >= 1 ? (
                    <Button
                      className="remove-question-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      <p>
                        <DeleteOutlined /> Remove Question
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
                  <PlusOutlined /> Add Context Question
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
};

export default TopicContextQ;