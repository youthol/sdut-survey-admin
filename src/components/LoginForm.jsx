import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const LoginForm = props => {
  const { getFieldDecorator } = props.form;

  return (
    <Form className="login-form" onSubmit={e => props.handleSubmit(e, props.form)}>
      <h2>{props.title || 'LOGIN'}</h2>
      <FormItem>
        {getFieldDecorator('username', {
          initialValue: '',
          rules: [{ required: true, message: 'Please input your Username!' }]
        })(
          <Input
            prefix={<Icon type="user" className="input-icon" />}
            autoComplete="off"
            placeholder="Username"
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }]
        })(
          <Input
            prefix={<Icon type="lock" className="input-icon" />}
            type="password"
            autoComplete="off"
            placeholder="Password"
          />
        )}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

LoginForm.propTypes = {
  title: PropTypes.string,
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default LoginForm;
