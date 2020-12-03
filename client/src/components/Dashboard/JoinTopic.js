import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchTopics } from "../../state/actions/fetchTopics";
import { addMember } from "../../api/topicMembers";
import { Button, Modal, Form, Input, message } from "antd";

export const JoinTopic = props => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const userID= localStorage.getItem("userID");

  useEffect(() => {
    props.fetchTopics();
  }, [])

  const join = () => {
    form
      .validateFields()
      .then(values => {
        let topicID = getTopicID(values);
        addMember({...values.newMember, topic_id: topicID })
          .then(res => {
            form.resetFields();
            setVisible(false);
            props.refreshTopics();
            message.info(`Success! Joined Topic.`);
          })
          .catch(err => {
            console.log("Join Topic Error:", err);
            message.info("Failed to join the topic.")
          })
      })
      .catch(err => console.log("There is an error with the Join Code:", err))
  };

  const getTopicID = values => {
    let chosenTopic = props.topics.filter(topic => topic.join_code === values.join_code);

    if(userID !== chosenTopic[0].leader_id) {
      return chosenTopic[0].id;
    } else {
      message.info("The leader cannot join their own topic.")
    }
  };

  const cancelJoin = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="secondary"
        data-testid="join-topic-btn"
        onClick={() => {
          setVisible(true);
        }}
      >
        Join Topic
      </Button>

      <Modal
        visible={visible}
        width={400}
        title="Join Topic"
        okText="Join"
        cancelText="Cancel"
        onCancel={cancelJoin}
        onOk={join}
        maskClosable={false}
      >
        <Form name="join-form" layout="vertical" form={form}>
          <Form.Item
            name={["join_code"]}
            label="Enter your join code:"
            rules={[
              { required: true, message: "Please enter your join code." }
            ]}
          >
            <Input data-testid="join-topic-form" placeholder="ex: 4gH7Dz" />
          </Form.Item>

          <Form.Item
            name={["newMember", "topic_id"]}
            className="closed"
            initialValue={""}
          ></Form.Item>

          <Form.Item
            name={["newMember", "user_id"]}
            className="closed"
            initialValue={userID}
          ></Form.Item>

          <Form.Item
            name={["newMember", "role"]}
            className="closed"
            initialValue={"user"}
          ></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isFetching: state.topicsList.isFetching,
    topics: state.topicsList.topics,
    errors: state.topicsList.errors
  }
};

export default connect(mapStateToProps, {fetchTopics})(JoinTopic);