import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Modal, Icon, message } from 'antd';
import './style.scss';
import LOGO from '@/assets/youthol_logo_lg@700x300.png';

const { Header, Content, Footer } = Layout;

class index extends Component {
  state = {
    isAuth: false
  };
  componentDidMount() {
    const { token, expires_at, admin } = sessionStorage;
    if (token && expires_at && admin) {
      this.setState({ isAuth: true });
    }
  }
  currentYear() {
    return new Date().getFullYear();
  }
  handleLogin = e => {
    if (this.props.history.location.pathname === '/login') {
      message.info('请登录');
    } else {
      this.props.history.push('/login');
    }
  };
  handleLogout = e => {
    Modal.confirm({
      title: '是否退出当前账号',
      okType: 'danger',
      okText: '是',
      cancelText: '否',
      onOk: () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expires_at');
        sessionStorage.removeItem('admin');
        sessionStorage.removeItem('isAuth');
        message.success('已退出');
        this.setState({ isAuth: false });
        if (this.props.history.location.pathname !== '/') {
          this.props.history.push('/');
        }
      }
    });
  };

  render() {
    return (
      <Layout>
        <Header className="page__hd">
          <div className="header-logo">
            <a href="/">
              <img src={LOGO} alt="LOGO" />
            </a>
          </div>
          <div className="header-title">
            <div>{this.props.title || '青春在线调查问卷后台管理系统'}</div>
          </div>
          <div className="header-user">
            {this.state.isAuth ? (
              <Icon
                type="user"
                title="退出"
                style={{ color: '#08c' }}
                onClick={this.handleLogout}
              />
            ) : (
              <Icon type="user" title="登录" onClick={this.handleLogin} />
            )}
          </div>
        </Header>
        <Content className="page__bd">{this.props.children}</Content>
        <Footer className="page__ft">
          <span>© {this.currentYear()} 青春在线网站 版权所有</span>
        </Footer>
      </Layout>
    );
  }
}

index.propTypes = {
  history: PropTypes.object.isRequired,
  title: PropTypes.string
};

export default index;
