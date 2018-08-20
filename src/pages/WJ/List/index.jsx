import React, { Component } from 'react';
import { Modal, BackTop, message } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from '@/components/DataList';

class ExistWJ extends Component {
  state = {
    data: [
      {
        key: '1',
        author: '青春在线',
        title: '新学期学生思想动态调查问卷',
        subtitle:
          '为了解我校学生开学初思想动态情况，我们设计了此调查问卷，请认真填写此问卷。此次调查为不记名方式，我们将对调查数据完全保密，并且不做任何商业用途，希望能够了解到你的真实想法。本次调研，除特殊说明的问题外均为单选，谢谢你的支持与合作! ',
        created_at: '2018-08-17 15:32:00',
        updated_at: '2018-08-17 15:32:00'
      },
      {
        key: '2',
        author: '青春在线',
        title: '新学期学生思想动态调查问卷',
        subtitle:
          '为了解我校学生开学初思想动态情况，我们设计了此调查问卷，请认真填写此问卷。此次调查为不记名方式，我们将对调查数据完全保密，并且不做任何商业用途，希望能够了解到你的真实想法。本次调研，除特殊说明的问题外均为单选，谢谢你的支持与合作! ',
        created_at: '2018-08-17 15:32:00',
        updated_at: '2018-08-17 15:32:00'
      },
      {
        key: '3',
        author: '青春在线',
        title: '新学期学生思想动态调查问卷',
        subtitle:
          '为了解我校学生开学初思想动态情况，我们设计了此调查问卷，请认真填写此问卷。此次调查为不记名方式，我们将对调查数据完全保密，并且不做任何商业用途，希望能够了解到你的真实想法。本次调研，除特殊说明的问题外均为单选，谢谢你的支持与合作! ',
        created_at: '2018-08-17 15:32:00',
        updated_at: '2018-08-17 15:32:00'
      }
    ]
  };
  componentDidMount() {
    let { token, admin } = sessionStorage;
    if (!token || !admin) {
      message.info('请登录');
      this.props.history.replace('/login');
    }
  }
  HandleJumpPage = (id, type = 1) => {
    if (!id) {
      return;
    }
    switch (type) {
      case 1:
        this.props.history.push(`/wj/${id}/edit`);
        break;
      case 2:
        this.props.history.push(`/wj/${id}/analyse`);
        break;
      default:
        return;
    }
  };
  handleDelete = e => {
    Modal.confirm({
      title: '是否删除这个问卷和作答',
      okType: 'danger',
      okText: '是',
      cancelText: '否',
      onOk: () => {
        message.success('已删除');
      }
    });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <DataList
          data={this.state.data}
          HandleJumpPage={this.HandleJumpPage}
          handleDelete={this.handleDelete}
        />
        <BackTop />
      </BasicLayout>
    );
  }
}

export default ExistWJ;
