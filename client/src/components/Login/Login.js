import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Divider, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import NavBar from "../Navbar";
import { loginUser } from "../../api/index";
import planet from "../../images/planet.svg";
import wavesL from "../../images/waves-left.svg";
import wavesR from "../../images/waves-right.svg";

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loginError, setLoginError] = useState(false);
  const [loginState, setLoginState] = useState(false);

  // icon for login loading state
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const submitForm = () => {
    setLoginState(true);

    form
      .validateFields()
      .then(values => {
        loginUser(values)
          .then(res => {
            if(res.message === "SUCCESS: User logged in.") {
              form.resetFields();
              console.log(res);
              setLoginState(false);
              history.push("/dashboard");
            } else {
              setLoginError(true);
            }
          })
          .catch(err => {
            console.log(err);
            setLoginError(true);
          })
      })
      .catch(err => {
        console.log("Please check your credentials and try again.");
      })
  };

  return (
    <div>
      <NavBar />

      <div className="user-container">
        <img src={planet} alt="planet floating in space" />

        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={submitForm}
          className="user-form"
          size="medium"
        >
          <Divider className="divider">Log In</Divider>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email.' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter a password.' }]}
          >
            <Input.Password visibilityToggle={false} placeholder="Password" />
          </Form.Item>

          {
            !loginState ? 
              <div>
                <Button type="primary" htmlType="submit" block>Login</Button>
                <p>Don't have account? <Link to="/signup">Sign up</Link></p>
              </div> : <Spin
                size="large"
                tip="Logging In..."
                indicator={antIcon}
                style={{width: "100%", marginTop: "2rem"}}
              />
          }

          {loginError && !loginState ? <p style={{color: "red"}}>There was an error logging in. Please try again.</p> : null}
        </Form>
      </div>

      <img className="waves-l" src={wavesL} alt="vector of purple waves in left bottom corner" />
      <img className="waves-r" src={wavesR} alt="vector of purple waves in top right corner" />
    </div>
  );
};

export default Login;