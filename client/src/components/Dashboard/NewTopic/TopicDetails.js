import React from "react";
import { Form, Input, Divider, Select } from "antd";
import generator from "generate-password";

const TopicDetails = () => {
  const {Option} = Select;
  const userID = localStorage.getItem("userID");

  // set the JOIN CODE
  const joinCode = generator.generate({
    length: 6,
    numbers: true,
    excludeSimilarCharacters: true
  });

  return (
    <div>
      <Divider>Details</Divider>

      <Form.Item
        name={["topic", "title"]}
        label="Topic Title"
        required
        rules={[{ required: true, message: "Please provide a topic title." }]}
      >
        <Input placeholder="ex: Daily Stand Up" />
      </Form.Item>

      <Form.Item
        name={["topic", "join_code"]}
        label="Join Code"
        className="closed"
        initialValue={joinCode}
      />

      <Form.Item
        style={{ marginTop: "1rem" }}
        name={["topic", "frequency"]}
        label="How often should the topic surveys occur?"
        required
        rules={[{ required: true, message: "Please set a topic frequency." }]}
      >
        <Select placeholder="Select a frequency">
          <Option value="Off">Off</Option>
          <Option value="Daily">Daily</Option>
          <Option value="Weekly">Weekly</Option>
          <Option value="Monthly">Monthly</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default TopicDetails;