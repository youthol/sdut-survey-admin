import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import LoginForm from '@/components/LoginForm';
import './style.scss';

class Login extends Component {
  componentDidMount() {
    const { token } = sessionStorage;
    if (token) {
      this.props.history.push('/');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.log(values);
        sessionStorage.setItem('token', 'ACCESS_TOKEN');
        sessionStorage.setItem('expires_at', 'EXPIRES_AT');
        sessionStorage.setItem('username', 'ADMIN');
        message.success('登录成功');
        this.props.history.push('/');
      }
    });
  };
  postLogin = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/`, params)
      .then(res => {
        // TODO: 验证返回数据，并且存用户token,expires_in，并且用token请求用户数据
        if (res.status >= 200 && res.status <= 300) {
          console.log(res);
        }
      })
      .catch(err => {
        message.error(err.response.status);
      });
  };
  getUserInfo = token => {
    if (!token) return;
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/`)
      .then(res => {
        // TODO: 验证返回数据，并且存用户信息
        if (res.status >= 200 && res.status <= 300) {
          console.log(res);
        }
      })
      .catch(err => {
        message.error(err.response.status);
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

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(Login));
