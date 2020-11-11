import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import NavBar from "../Navbar";
import { registerUser } from "../../api/index";
import astronaut from "../../images/astronaut.svg";
import wavesL from "../../images/waves-left.svg";
import wavesR from "../../images/waves-right.svg";

const SignUp = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const submitForm = () => {
    form
      .validateFields()
      .then(values => {
        registerUser(values)
          .then(res => {
            console.log(res);
            form.resetFields();
            history.push("/login");
          })
          .catch(err => {
            alert('User Registration Failed');
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
        <img src={astronaut} alt="astronaut floating in space with two planets" />

        <Form
          form={form}
          name="signup"
          layout="vertical"
          onFinish={submitForm}
          className="user-form"
          size="medium"
        >
          <Divider className="divider">Sign Up</Divider>

          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'Please input your first name.' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input your last name.' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter a password.' }]}
          >
            <Input.Password visibilityToggle={false} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email.' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>Sign Up</Button>
          <p>Already have an account? <Link to="/login">Log In</Link></p>
        </Form>
      </div>

      <img className="waves-l" src={wavesL} alt="vector of purple waves in left bottom corner" />
      <img className="waves-r" src={wavesR} alt="vector of purple waves in top right corner" />
    </div>
  );
};

export default SignUp;