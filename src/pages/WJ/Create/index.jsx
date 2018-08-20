import React, { Component } from 'react';
import { Row, Col, BackTop, Form, Icon, Button, message } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import AddFormTitle from '@/components/AddFormTitle';
import AddFormItems from '@/components/AddFormItems';

const FormItem = Form.Item;

class CreateWJ extends Component {
  /**
   * @description 生成指定长度的随机字符串
   * @param {number} [len=8]
   * @returns
   */
  componentDidMount() {
    let { token, admin } = sessionStorage;
    if (!token || !admin) {
      message.info('请登录');
      this.props.history.replace('/login');
    }
  }

  randomString = (len = 8) => {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    /* 用作验证码时可去掉了容易混淆的字符 0Oo,1LlI,9gq,Vv,Uu,Zz2 */
    let maxPos = chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
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
      default:
        return;
    }
    // can use data-binding to set
    form.setFieldsValue({ qKeys, aKeys });
  };
  /**
   * @description 新增问题或选项，1增加选项2增加问题和选项
   * @param {*} key
   * @param {number} [type=2]
   * @returns
   */
  addItem = (key, type = 2) => {
    const { form } = this.props;
    // can use data-binding to get
    let randomKey = this.randomString();
    let qKeys = form.getFieldValue('qKeys');
    let aKeys = form.getFieldValue('aKeys');
    // Selective modification value
    switch (type) {
      case 1:
        aKeys = [
          ...aKeys,
          {
            key: this.randomString(10),
            qkey: key
          }
        ];
        break;
      case 2:
        qKeys = [...qKeys, randomKey];
        aKeys = [
          ...aKeys,
          {
            key: this.randomString(10),
            qkey: randomKey
          },
          {
            key: this.randomString(10),
            qkey: randomKey
          }
        ];
        break;
      default:
        return;
    }
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({ qKeys, aKeys });
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
        let { qKeys, aKeys, question, answer, required, type, title, subtitle } = values;
        let questions = qKeys.map((key, idx) => ({
          key,
          label: question[key],
          serial_num: idx,
          input_type: type[key],
          is_required: required[key]
        }));
        let answers = [];
        qKeys.forEach(key => {
          answers = [
            ...answers,
            ...aKeys.filter(i => i.qkey === key).map((item, idx) => ({
              key: item.key,
              qKey: item.qkey,
              label: answer[item.key],
              value: String.fromCharCode(idx + 65)
            }))
          ];
        });
        console.log(title, subtitle, questions, answers);
      }
    });
  };
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const formItemLayoutWithRight = { width: '80%', marginRight: 8 };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 }
      }
    };
    getFieldDecorator('qKeys', { initialValue: [] });
    getFieldDecorator('aKeys', { initialValue: [] });
    return (
      <BasicLayout history={this.props.history}>
        <Row type="flex" justify="center">
          <Col xs={20} sm={20} md={20} lg={20}>
            <Form onSubmit={this.handleSubmit}>
              <AddFormTitle
                form={this.props.form}
                formItemLayout={formItemLayout}
                formItemLayoutWithRight={formItemLayoutWithRight}
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

export default Form.create()(CreateWJ);
