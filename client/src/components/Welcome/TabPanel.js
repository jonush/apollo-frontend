import React, { useState } from 'react';
import { Tabs } from "antd";
import context from "../../images/context-ex.png";
import topic from "../../images/topic-ex.png";
import survey from "../../images/survey-ex.png"

const TabPanel = () => {
  const [value, setValue] = useState(0);
  const { TabPane } = Tabs;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tabs-container">
      <Tabs
        className="tabs-box"
        defaultActiveKey="1"
        tabPosition="left"
        tabBarGutter={100}
        size="large"
        centered
      >
        <TabPane className="tab" tab="Context" key="1">
          <div className="tab-content">
            <div className="tab-description">
              <h2>Context</h2>

              <p>Apollo keeps the focus centered around context. As a team leader, give your team context as to what your objectives are to keep teams aligned towards the same vision.</p>
            </div> 

            <img src={context} alt="context title and two questions" />
          </div>
        </TabPane>

        <TabPane className="tab" tab="Topics" key="2">
          <div className="tab-content">
            <div className="tab-description">
              <h2>Topics</h2>

              <p>Create a topic in Apollo and add team members to get started. Topic leaders can create new surveys and set questions to ask team members. View and respond to surveys from inside a topic.</p>
            </div> 

            <img src={topic} alt="topic title and context questions" />
          </div>
        </TabPane>

        <TabPane className="tab" tab="Surveys" key="3">
          <div className="tab-content">
            <div className="tab-description">
              <h2>Surveys</h2>

              <p>Create surveys and send out questions, announcements, or objectives to team members. Set the frequency once, and Apollo will automatically send out the survey for you.</p>
            </div> 

            <img src={survey} alt="survey and two questions with responses" />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabPanel;
