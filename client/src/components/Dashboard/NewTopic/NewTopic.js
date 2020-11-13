import React, { useState } from "react";
import { Button, Modal, Form, Steps } from "antd";
import TopicDetails from "./TopicDetails";
import TopicContext from "./TopicContext";
import TopicQuestions from "./TopicQuestions";
import TopicReview from "./TopicReview";

const NewTopic = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);

  const createTopic = () => {
    form
      .validateForm()
      .then(values => {
        console.log(values);
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
        onOK={createTopic}
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
                onClick={createTopic}
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
          progressDot
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
          <div className={page === 0 ? null : "closed"}>
            <TopicDetails />
          </div>

          <div className={page === 1? null : "closed"}>
            <TopicContext />
          </div>

          <div className={page === 2 ? null : "closed"}>
            <TopicQuestions />
          </div>

          <div className={page === 3 ? null : "closed"}>
            <TopicReview />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default NewTopic;