import React, { useState } from "react";
import { Modal, Form, Input, Button, Divider } from "antd";
import { createResponse } from "../../../api/responses";
import axios from "axios";

const ResponseForm = props => {
  const [visible, setVisible] = useState(false);
  const userID = parseInt(localStorage.getItem("userID"));
  const [form] = Form.useForm();

  const submitResponses = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        axios.all(values.surveyResponses.map(r => {
          return createResponse(r)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }))
        .then(() => {
          // trigger the request to fetch responses
          props.refresh();
          cancelResponses();
        })
      })
      .catch(err => console.log("RESPONSE FORM ERROR:", err))
  };

  const cancelResponses = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div className="response-form-container">
      <Divider></Divider>

      <Button type="primary" onClick={() => {setVisible(true)}}>Respond</Button>
      
      <Modal
        className="response-form"
        centered
        visible={visible}
        maskClosable={false}
        title="Survey Responses"
        width="50%"
        bodyStyle={{
          width: "70%",
          height: "60vh",
          overflow: "auto",
          overflowX: "hidden",
          margin: "0 auto"
        }}
        onCancel={cancelResponses}
        okText="Submit"
        footer={
          <>
            <Button
              type="secondary"
              style={{ width: "30%" }}
              onClick={cancelResponses}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              style={{ width: "30%" }}
              onClick={submitResponses}
            >
              Submit Responses
            </Button>
          </>
        }
      >
        <Form
          form={form}
          layout="vertical"
          name="response_form"
        >
          <Divider>Responses</Divider>
          {
            props.questions.filter(q => q.type === "request").map((q, index) => {
              return (
                <div className="survey-response" key={index}>
                  <Form.Item
                    className="closed"
                    name={["surveyResponses", index, "survey_id"]}
                    initialValue={props.survey.id}
                  ></Form.Item>

                  <Form.Item
                    className="closed"
                    name={["surveyResponses", index, "user_id"]}
                    initialValue={userID}
                  ></Form.Item>

                  <Form.Item
                    className="closed"
                    name={["surveyResponses", index, "question"]}
                    initialValue={q.question}
                  ></Form.Item>

                  <Form.Item
                    className="closed"
                    name={["surveyResponses", index, "style"]}
                    initialValue={q.style}
                  ></Form.Item>

                  <Form.Item
                    className="closed"
                    name={["surveyResponses", index, "topic_id"]}
                    initialValue={props.topic.id}
                  ></Form.Item>

                  <Form.Item
                    className="closed"
                    name={["surveyResponses", index, "question_id"]}
                    initialValue={q.question_id}
                  ></Form.Item>

                  <Form.Item
                    name={["surveyResponses", index, "response"]}
                    label={q.question}
                    initialValue={""}
                  >
                    <Input.TextArea autoSize={{ minRows: 2}} />
                  </Form.Item>
                </div>
              );
            })
          }
        </Form>
      </Modal>
    </div>
  );
};

export default ResponseForm;