import React, { Component } from 'react';
import { Form, message } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from '@/components/LoginForm';
import './style.scss';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        sessionStorage.setItem('token', 'ACCESS_TOKEN');
        sessionStorage.setItem('expires_at', 'EXPIRES_AT');
        sessionStorage.setItem('admin', 'ADMIN');
        message.success('登录成功');
        this.props.history.push('/');
      }
    });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <LoginForm form={this.props.form} handleSubmit={this.handleSubmit} />
      </BasicLayout>
    );
  }
}

export default Form.create()(Login);
