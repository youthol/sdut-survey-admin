import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Card, DatePicker, Button, Icon, Switch, Select, Divider } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

const AddFormTitle = props => {
  const { getFieldDecorator } = props.form;

  return (
    <Card style={{ margin: '10px', backgroundColor: '#f3f9f1' }}>
      <FormItem {...props.formItemLayout} label="问卷标题">
        {getFieldDecorator('title', {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: '新学期学生思想动态调查问卷',
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input title's content."
            }
          ]
        })(
          <Input
            placeholder="新学期学生思想动态调查问卷"
            autoComplete="off"
            style={props.formItemLayoutWithRight}
          />
        )}
      </FormItem>
      <FormItem {...props.formItemLayout} label="问卷副标题">
        {getFieldDecorator('subtitle', {
          validateTrigger: ['onChange', 'onBlur']
        })(<TextArea placeholder="问卷副标题" autosize style={props.formItemLayoutWithRight} />)}
      </FormItem>
      <FormItem {...props.formItemLayout} label="开始时间">
        {getFieldDecorator('start_at', {
          validateTrigger: ['onChange'],
          rules: [
            {
              required: true,
              message: 'Please select system start datetime.'
            }
          ]
        })(
          <DatePicker
            showTime={{ minuteStep: 5, format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder="Start"
          />
        )}
      </FormItem>
      <FormItem {...props.formItemLayout} label="结束时间">
        {getFieldDecorator('end_at', {
          validateTrigger: ['onChange'],
          rules: [
            {
              required: true,
              message: 'Please select system end datetime.'
            }
          ]
        })(
          <DatePicker
            showTime={{ minuteStep: 5, format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder="End"
          />
        )}
      </FormItem>
      <FormItem {...props.formItemLayout} label="是否必填" required={true}>
        {getFieldDecorator(`user_required`, {
          validateTrigger: ['onChange', 'onBlur'],
          initialValue: false
        })(<Switch onChange={props.onChange} />)}
      </FormItem>
      {props.userRequired &&
        props.tKeys &&
        props.tKeys.map(key => (
          <div key={key}>
            <Divider />
            <FormItem {...props.formItemLayout} label="验证字段">
              {getFieldDecorator(`field_title[${key}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input field's content or delete this field."
                  }
                ]
              })(
                <Input
                  placeholder="验证字段内容"
                  autoComplete="off"
                  style={props.formItemLayoutWithRight}
                />
              )}
              {props.tKeys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={props.tKeys.length === 1}
                  onClick={() => props.removeItem(key, 3)}
                />
              ) : null}
            </FormItem>
            <FormItem {...props.formItemLayout} label="选项">
              {getFieldDecorator(`field_option[${key}]`, {
                validateTrigger: ['onChange', 'onBlur']
              })(
                <Select
                  mode="tags"
                  style={props.formItemLayoutWithRight}
                  placeholder="使用空格或回车隔开不同选项，不填默认用户填写"
                  tokenSeparators={[' ']}
                />
              )}
            </FormItem>
          </div>
        ))}
      {props.userRequired && (
        <FormItem {...props.formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={() => props.addItem('key', 3)}>
            <Icon type="plus" /> 新增验证问题
          </Button>
        </FormItem>
      )}
    </Card>
  );
};

AddFormTitle.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object,
  formItemLayoutWithRight: PropTypes.object
};

export default AddFormTitle;
