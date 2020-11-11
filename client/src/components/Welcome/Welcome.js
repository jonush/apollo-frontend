import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import TabPanel from "./TabPanel";
import { Button } from "antd";
import headerImg from "../../images/headerAstronaut.png";
import blocks from "../../images/blocks.svg";
import asyncIcon from "../../images/async.svg";
import clock from "../../images/clock.svg";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";

const Welcome = () => {
  return (
    <div className="welcome">
      <Navbar />

      <div className="header">
        <Slide left>
          <div className="header-intro">
            <p>Automate your stand ups. <span style={{ "color": "#7000FF"}}>Apollo</span> handles the trouble of managing meetings so that you don't have to. Provide progress updates to team members on your own time. Create topics and answer surveys <span style={{ "textDecoration": "underline", "textDecorationColor": "#7000FF" }}>asynchronously</span>.</p>
            <Link to="/signup"><Button type="primary">Get Started</Button></Link>
          </div>
        </Slide>

        <img src={headerImg} alt="astronaut helmet looking at planets"/>
      </div>

      <div className="features">
        <h3 className="features-title">Apollo handles the hassle of setting up standup meetings by focusing on what matters—your team's progress.</h3>

        <div className="feature-columns">
          <Fade left delay={200}>
            <div className="feature">
              <img src={blocks} alt="a stack of three blocks outlined" />

              <div className="feature-description">
                <h3>Aligned</h3>
                <p>Apollo keeps teams grounded to unified goals so that teams can stay on the same age.</p>
              </div>
            </div>
          </Fade>        

          <Fade left delay={400}>
            <div className="feature">
              <img src={clock} alt="a clock" />

              <div className="feature-description">
                <h3>Automated</h3>
                <p>Apollo will send out surveys at scheduled intervals of your choosing.  Set the frequency once and never worry about it again.</p>
              </div>
            </div>
          </Fade>

          <Fade left delay={600}>
            <div className="feature">
              <img src={asyncIcon} alt="downwards facing flow chart with three nodes" />

              <div className="feature-description">
                <h3>Asynchronous</h3>
                <p>No more need to coordinate availability—give the team progress updates on your own time when you can.</p>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      <div>
        <TabPanel />
      </div>
    </div>
  )
};

export default Welcome;