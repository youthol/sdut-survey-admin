import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Input, Radio, Switch, Icon, Button } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const AddFormItems = props => {
  const { getFieldDecorator } = props.form;

  return (
    <div>
      {props.qKeys &&
        props.qKeys.map((key, index) => (
          <Card key={key} style={{ margin: '10px', backgroundColor: '#f3f9f1' }}>
            <FormItem {...props.formItemLayout} label={`题目${index + 1}`}>
              {getFieldDecorator(`question[${key}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input question's content or delete this field."
                  }
                ]
              })(
                <Input
                  placeholder="问题内容"
                  autoComplete="off"
                  style={props.formItemLayoutWithRight}
                />
              )}
              {props.qKeys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={props.qKeys.length === 1}
                  onClick={() => props.removeItem(key, 2)}
                />
              ) : null}
            </FormItem>
            <FormItem {...props.formItemLayout} label="类型" required={true}>
              {getFieldDecorator(`type[${key}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: '1'
              })(
                <RadioGroup>
                  <Radio value="1">单选</Radio>
                  <Radio value="2">多选</Radio>
                  <Radio value="3">填空</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem {...props.formItemLayout} label="是否必填" required={true}>
              {getFieldDecorator(`required[${key}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                initialValue: true
              })(<Switch defaultChecked />)}
            </FormItem>
            {props.aKeys &&
              props.aKeys.filter(i => i.qkey === key).map((item, idx) => (
                <FormItem {...props.formItemLayout} label={`选项${idx + 1}`} key={item.key}>
                  {getFieldDecorator(`answer[${item.key}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input answer's content or delete this field."
                      }
                    ]
                  })(
                    <Input
                      placeholder="选项内容"
                      autoComplete="off"
                      style={props.formItemLayoutWithRight}
                    />
                  )}
                  {props.aKeys.filter(i => i.qkey === key).length > 1 ? (
                    <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={props.aKeys.filter(i => i.qkey === key).length === 1}
                      onClick={() => props.removeItem(item.key)}
                    />
                  ) : null}
                </FormItem>
              ))}
            <FormItem {...props.formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={() => props.addItem(key, 1)}>
                <Icon type="plus" /> 新增选项
              </Button>
            </FormItem>
          </Card>
        ))}
    </div>
  );
};

AddFormItems.propTypes = {
  form: PropTypes.object.isRequired,
  qKeys: PropTypes.array,
  aKeys: PropTypes.array,
  formItemLayout: PropTypes.object,
  formItemLayoutWithRight: PropTypes.object,
  formItemLayoutWithOutLabel: PropTypes.object,
  addItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default AddFormItems;
