import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, BackTop, Form, Icon, Button, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
import BasicLayout from '@/layouts/BasicLayout';
import AddFormTitle from '@/components/AddFormTitle';
import AddFormItems from '@/components/AddFormItems';

const FormItem = Form.Item;

class CreateWJ extends Component {
  state = {
    user_required: false,
  };

  componentDidMount() {
    let { token } = sessionStorage;
    if (!token) {
      message.info('请登录');
      this.props.history.replace('/login');
    }
  }

  /**
   * @description 生成指定长度的随机字符串
   * @param {number} [len=8]
   * @returns
   */
  randomString = (len = 6) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&_';
    /* 用作验证码时可去掉了容易混淆的字符 0Oo,1LlI,9gq,Vv,Uu,Zz2 */
    let maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd + (Date.now() / 1000).toFixed(0);
  };

  /**
   * @description 删除问题或选项，1删除选项2删除问题和选项
   * @param {*} k
   * @param {number} [type=1]
   * @returns
   */
  removeItem = (k, type = 1) => {
    const { form } = this.props;
    // can use data-binding to get
    let qKeys = form.getFieldValue('qKeys');
    let aKeys = form.getFieldValue('aKeys');
    let tKeys = form.getFieldValue('tKeys');
    // We need at least one item
    if (aKeys.length === 1 || (qKeys.length === 1 && type === 2)) {
      return;
    }
    // Selective modification value
    switch (type) {
      case 1:
        aKeys = aKeys.filter(i => i.key !== k);
        break;
      case 2:
        qKeys = qKeys.filter(i => i !== k);
        aKeys = aKeys.filter(i => i.qkey !== k);
        break;
      case 3:
        tKeys = tKeys.filter(i => i !== k);
        break;
      default:
        return;
    }
    // can use data-binding to set
    form.setFieldsValue({ qKeys, aKeys, tKeys });
  };
  /**
   * @description 新增问题或选项，1增加选项2增加问题和选项3增加用户验证字段
   * @param {*} key
   * @param {number} [type=2]
   * @returns
   */
  addItem = (key, type = 2) => {
    const { form } = this.props;
    const randomKey = this.randomString();
    // can use data-binding to get
    let qKeys = form.getFieldValue('qKeys');
    let aKeys = form.getFieldValue('aKeys');
    let tKeys = form.getFieldValue('tKeys');
    // Selective modification value
    switch (type) {
      case 1:
        aKeys = [
          ...aKeys,
          {
            key: this.randomString(),
            qkey: key,
          },
        ];
        break;
      case 2:
        qKeys = [...qKeys, randomKey];
        aKeys = [
          ...aKeys,
          {
            key: this.randomString(),
            qkey: randomKey,
          },
          {
            key: this.randomString(),
            qkey: randomKey,
          },
        ];
        break;
      case 3:
        tKeys = [...tKeys, this.randomString()];
        break;
      default:
        return;
    }
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({ qKeys, aKeys, tKeys });
  };

  onChange = e => {
    this.setState({ user_required: e });
    if (e) {
      this.addItem('key', 3);
    } else {
      this.props.form.setFieldsValue({ tKeys: [] });
    }
  };

  /**
   * @description 根据题型增删选项和新增按钮
   * @param {*} e
   * @param {*} key
   * @returns
   */
  handleTypeChange = (e, key) => {
    console.log(e.target.value, key);
    const { value } = e.target;
    if (!value) return;
    const { form } = this.props;
    let aKeys = form.getFieldValue('aKeys');
    switch (value) {
      case '3':
        aKeys = aKeys.filter(el => el.qkey !== key);
        break;
      default:
        aKeys = [
          ...aKeys,
          {
            key: this.randomString(),
            qkey: key,
          },
        ];
    }
    form.setFieldsValue({ aKeys });
  };

  /**
   * @description 标准化表单值，验证后提交至后台
   * @param {*} e
   */
  handleSubmit = e => {
    e.preventDefault();
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        let { qKeys, aKeys, question, answer, required, type } = values;
        let { tKeys, field_title, field_option } = values;
        let { title, subtitle, user_required, start_at, end_at } = values;
        let questions = qKeys.map((key, idx) => ({
          key,
          input_title: question[key],
          input_num: idx + 1,
          input_type: type[key],
          is_required: required[key],
        }));
        let options = [];
        qKeys.forEach(key => {
          options = [
            ...options,
            ...aKeys.filter(i => i.qkey === key).map((item, idx) => ({
              // key: item.key,
              qKey: item.qkey,
              field_label: answer[item.key],
              field_value: String.fromCharCode(idx + 65),
            })),
          ];
        });
        let validate_field = tKeys.map((key, idx) => ({
          key,
          input_title: field_title[key],
          input_num: idx + 1,
          input_type: field_option[key] && field_option[key].length ? 1 : 0,
          input_options:
            field_option[key] &&
            field_option[key].map((ele, i) => ({
              field_label: ele,
              field_value: String.fromCharCode(i + 65),
            })),
        }));
        let category = {
          title,
          description: subtitle,
          start_at: start_at.format('YYYY-MM-DD HH:ss:00'),
          end_at: end_at.format('YYYY-MM-DD HH:ss:00'),
          user_required: user_required,
        };
        let formData = {
          questions,
          options,
          category,
          validate_field,
        };
        console.log(formData);
        this.createSurvey(formData);
      }
    });
  };

  createSurvey = data => {
    if (!data) return;
    const { baseUrl } = this.props;
    const { token } = sessionStorage;
    const params = qs.stringify(data);
    axios
      .post(`${baseUrl}/ques/create`, params, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        // TODO: 创建成功后跳转到主页面
        if (res.status >= 200 && res.status <= 300) {
          console.log(res);
          this.props.history.push('/');
        }
      })
      .catch(err => {
        message.error(err.response.data.message);
      });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formItemLayoutWithRight = { width: '80%', marginRight: 8 };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
      },
    };
    getFieldDecorator('qKeys', { initialValue: [] });
    getFieldDecorator('aKeys', { initialValue: [] });
    getFieldDecorator('tKeys', { initialValue: [] });
    return (
      <BasicLayout history={this.props.history}>
        <Row type="flex" justify="center">
          <Col xs={20} sm={20} md={20} lg={20}>
            <Form onSubmit={this.handleSubmit}>
              <AddFormTitle
                form={this.props.form}
                formItemLayout={formItemLayout}
                formItemLayoutWithRight={formItemLayoutWithRight}
                formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
                tKeys={getFieldValue('tKeys')}
                userRequired={this.state.user_required}
                onChange={this.onChange}
                removeItem={this.removeItem}
                addItem={this.addItem}
              />
              <AddFormItems
                form={this.props.form}
                formItemLayout={formItemLayout}
                formItemLayoutWithRight={formItemLayoutWithRight}
                formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
                qKeys={getFieldValue('qKeys')}
                aKeys={getFieldValue('aKeys')}
                removeItem={this.removeItem}
                addItem={this.addItem}
                handleTypeChange={this.handleTypeChange}
              />
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.addItem} style={formItemLayoutWithRight}>
                  <Icon type="plus" /> 新增题目
                </Button>
              </FormItem>
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <BackTop />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
});

export default connect(mapStateToProps)(Form.create()(CreateWJ));
