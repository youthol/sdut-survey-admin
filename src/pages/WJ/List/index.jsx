import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, BackTop, message } from 'antd';
import axios from 'axios';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from '@/components/DataList';
import { updateSurveyList, clearSurveyList } from '@/actions/invests';

class ExistWJ extends Component {
  state = {
    data: [],
  };
  componentDidMount() {
    let { token } = sessionStorage;
    if (!token) {
      message.info('请登录');
      this.props.history.replace('/login');
    }
    this.getSurveyList();
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
      },
    });
  };

  getSurveyList = e => {
    const { token } = sessionStorage;
    if (!token) return;
    const { baseUrl } = this.props;

    axios
      .get(`${baseUrl}/ques`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          const data = res.data.data.map(item => ({
            ...item,
            key: item.id,
          }));
          this.setState({ data });
          this.props.updateSurveyList(data);
        }
      })
      .catch(err => {
        console.log(err);
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

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
  invests: state.invests,
});

const mapDispatchToProps = dispatch => ({
  updateSurveyList: bindActionCreators(updateSurveyList, dispatch),
  clearSurveyList: bindActionCreators(clearSurveyList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExistWJ);
