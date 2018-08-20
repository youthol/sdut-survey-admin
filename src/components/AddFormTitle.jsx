import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Card } from 'antd';

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
    </Card>
  );
};

AddFormTitle.propTypes = {
  form: PropTypes.object.isRequired,
  formItemLayout: PropTypes.object,
  formItemLayoutWithRight: PropTypes.object
};

export default AddFormTitle;
