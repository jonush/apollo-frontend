import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import context from "../images/context-ex.png";
import topic from "../images/topic-ex.png";
import survey from "../images/survey-ex.png"

const TabPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper className="slider">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          className="tabs"
        >
          <Tab label="Context" className="tab"/>
          <Tab label="Topics" className="tab" />
          <Tab label="Surveys" className="tab" />
        </Tabs>
      </Paper>

      {
        value === 0 ? 
        <div className="tab-content">
          <div className="tab-description">
            <h2>Context</h2>

            <p>Apollo keeps the focus centered around context. As a team leader, give your team context as to what your objectives are to keep teams aligned towards the same vision.</p>
          </div> 

          <img src={context} alt="context title and two questions" />
        </div>
        : null
      }

      {
        value === 1 ? 
        <div className="tab-content">
          <div className="tab-description">
            <h2>Topics</h2>

            <p>Create a topic in Apollo and add team members to get started. Topic leaders can create new surveys and set questions to ask team members. View and respond to surveys from inside a topic.</p>
          </div> 

          <img src={topic} alt="topic title and context questions" />
        </div>
        : null
      }
      
      {
        value === 2 ? 
        <div className="tab-content">
          <div className="tab-description">
            <h2>Surveys</h2>

            <p>Create surveys and send out questions, announcements, or objectives to team members. Set the frequency once, and Apollo will automatically send out the survey for you.</p>
          </div> 

          <img src={survey} alt="survey and two questions with responses" />
        </div>
        : null
      }
    </div>
  );
};

export default TabPanel;
