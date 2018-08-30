import React, { Component } from 'react';
import { Layout, Modal, Icon, message } from 'antd';
import LOGO from '@/assets/youthol_logo_lg@700x300.png';
import './style.scss';

const { Header, Content, Footer } = Layout;

class BasicLayout extends Component {
  state = {
    isAuth: false
  };
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
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
        sessionStorage.clear();
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

export default BasicLayout;
