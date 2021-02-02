import React, { useState } from "react";
import { Button, Modal, Form, Steps } from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import { createTopic } from "../../../api/topics";
import { createQuestion } from "../../../api/questions";
import TopicDetails from "./TopicDetails";
import TopicContextQ from "./TopicContextQ";
import TopicSurveyQ from "./TopicSurveyQ";
import TopicReview from "./TopicReview";
import axios from "axios";

const NewTopic = props => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);

  const createNewTopic = () => {
    form
      .validateFields()
      .then(values => {
        console.log(values);
        createTopic(values.topic)
          .then(res => {
            let questions = setTopicID(values, res.topicID);
            axios
              .all(questions.map(q => {
                createQuestion(q);
              }))
              .then(res => {
                setVisible(false);
                props.refreshTopics(true);
                showJoinCode(values);
                form.resetFields();
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log("Creating topic", err);
            alert("Unable to create the topic. Please try again.")
          });
      })
      .catch(err => {
        console.log(err);
      })
  };

  const cancelTopic = () => {
    form.resetFields();
    setVisible(false);
    setPage(0);
  };

  const setTopicID = (values, topicID) => {
    for(let i = 0; i < values.contextQuestions.length; i++) {
      values.contextQuestions[i].topic_id = topicID;
    };

    for(let i = 0; i < values.surveyQuestions.length; i++) {
      values.surveyQuestions[i].topic_id = topicID;
    };

    return values.contextQuestions.concat(values.surveyQuestions);
  };

  // display Join code on submit
  const showJoinCode = values => {
    return Modal.confirm({
      title: "Here is your join code: ",
      icon: <InfoCircleTwoTone />,
      content: values.topic.join_code,
      okText: "Ok"
    });
  };

  return (
    <div>
      <Button type="primary" onClick={() => {setVisible(true)}}>New Topic</Button>
      
      <Modal
        centered
        visible={visible}
        maskClosable={false}
        title="New Topic"
        width="50%"
        bodyStyle={{
          width: "70%",
          height: "60vh",
          overflow: "auto",
          overflowX: "hidden",
          margin: "0 auto"
        }}
        onOK={createNewTopic}
        onCancel={cancelTopic}
        footer={
          <>
            {page === 0 ? null : (
              <Button
                style={{ width: "15%" }}
                type="secondary"
                onClick={() => {setPage(page - 1)}}
              >
                Back
              </Button>
            )}
            {page === 3 ? (
              <Button
                type="primary"
                style={{ width: "30%" }}
                onClick={createNewTopic}
              >
                Create Topic
              </Button>
            ) : (
              <Button
                style={{ width: "15%" }}
                type="primary"
                onClick={() => {setPage(page + 1)}}
              >
                Next
              </Button>
            )}
          </>
        }
      >
        <Steps
          className="progress-bar"
          size="small"
          current={page}
          style={{ marginBottom: "1rem" }}
        >
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
        </Steps>

        <Form form={form} layout="vertical" name="form_in_modal">
          { page === 0 ? <TopicDetails /> : null }
          { page === 1 ? <TopicContextQ /> : null }
          { page === 2 ? <TopicSurveyQ /> : null }
          { page === 3 ? <TopicReview form={form} page={page} /> : null }
        </Form>
      </Modal>
    </div>
  );
};

export default NewTopic;