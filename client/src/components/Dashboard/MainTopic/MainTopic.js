import React, { useEffect, useState } from "react";
import SurveysList from "./SurveysList";
import Context from "./Context";
import Responses from "./Responses";
import NewSurvey from "../NewSurvey/NewSurvey";
import EditTopicForm from "./EditTopicForm";
import { deleteTopic } from "../../../api/topics";
import { Dropdown, Menu, Popconfirm, message } from "antd";
import { SettingFilled } from "@ant-design/icons";

const MainTopic = (props) => {
  const [survey, setSurvey] = useState({});
  const [edit, setEdit] = useState(false);
  const userID = parseInt(localStorage.getItem("userID"));

  // clear the survey selection dropdown menu
  useEffect(() => {
    setSurvey({});
  }, [props.topic.id]);

  // function for copying join code to the clipboard
  const copyJoinCode = () => {
    navigator.clipboard.writeText(props.topic.join_code);
    message.info("Copied Join Code");
  };

  // set the selected survey to state
  const viewSurvey = (survey) => {
    setSurvey(survey);
  };

  // function called to delete the current topic
  const confirmDelete = () => {
    deleteTopic(props.topic.id)
      .then((res) => {
        message.success("The topic has been deleted.");
        // refresh the topics list upon deleting the topic
        props.refreshTopics();
        props.viewTopic(null);
      })
      .catch((err) => {
        message.error("There was error deleting this topic.");
      });
  };

  // dropdown menu for topic settings
  const menu = (
    <Menu>
      <Menu.Item
        key="0"
        onClick={() => {
          setEdit(true);
        }}
      >
        <a>Edit</a>
      </Menu.Item>
      <Menu.Item key="1">
        <Popconfirm
          title="Are you sure to delete this topic?"
          onConfirm={confirmDelete}
          okText="Delete"
          cancelText="Cancel"
        >
          <a href="#">Delete</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="main-topic-container">
      <div className="topic-container">
        <h2 className="topic-title">
          {props.topic.title}
          {props.topic.leader_id === userID ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="topic-settings-button"
                onClick={(e) => e.preventDefault()}
              >
                <SettingFilled />
              </a>
            </Dropdown>
          ) : null}
        </h2>

        <h4
          className="join-code"
          onClick={() => {
            copyJoinCode();
          }}
        >
          JOIN CODE: {props.topic.join_code}
        </h4>

        <div className="survey-list">
          {/* if user is topic leader, show new survey button */}
          {props.topic.leader_id === userID ? (
            <NewSurvey topic={props.topic} updatedTopic={edit} />
          ) : null}

          {/* the survey list rendered as a select menu */}
          <SurveysList topic={props.topic} viewSurvey={viewSurvey} />
        </div>

        {/* the context responses */}
        <Context topic={props.topic} survey={survey} />
      </div>

      <div className="responses-container">
        {/* the responses list */}
        <Responses topic={props.topic} survey={survey} />
      </div>

      {/* Modal for editing the existing topic */}
      {edit ? (
        <EditTopicForm edit={edit} setEdit={setEdit} topic={props.topic} />
      ) : null}
    </div>
  );
};

export default MainTopic;