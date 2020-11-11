import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import NavBar from "../Navbar";
import { loginUser } from "../../api/index";
import planet from "../../images/planet.svg";
import wavesL from "../../images/waves-left.svg";
import wavesR from "../../images/waves-right.svg";

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const submitForm = () => {
    form
      .validateFields()
      .then(values => {
        loginUser(values)
          .then(res => {
            console.log(res);
            form.resetFields();
            // history.push("/dashboard");
          })
          .catch(err => {
            alert('User Login Failed');
          })
      })
      .catch(err => {
        console.log(err);
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
            <Input placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>Sign Up</Button>
          <p>Don't have account? <Link to="/signup">Sign up</Link></p>
        </Form>
      </div>

      <img className="waves-l" src={wavesL} alt="vector of purple waves in left bottom corner" />
      <img className="waves-r" src={wavesR} alt="vector of purple waves in top right corner" />
    </div>
  );
};

export default Login;