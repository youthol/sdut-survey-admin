import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import moment from 'moment';
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

        this.postLogin(values);
      }
    });
  };
  postLogin = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/ques/login`, params)
      .then(res => {
        // TODO: 验证返回数据，并且存用户token,expires_in，并且用token请求用户数据
        if (res.status >= 200 && res.status <= 300) {
          const { access_token, expires_in } = res.data.data;
          const expires_at = moment()
            .add(expires_in, 'second')
            .format('YYYY-MM-DD HH:mm:ss');
          sessionStorage.clear();
          sessionStorage.setItem('token', access_token);
          sessionStorage.setItem('expires_at', expires_at);
          this.props.history.push('/');
        }
      })
      .catch(err => {
        message.error(err.response.data.message);
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
