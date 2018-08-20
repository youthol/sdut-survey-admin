import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Card, Icon } from 'antd';
import './style.scss';
import BasicLayout from '@/layouts/BasicLayout';

class Home extends Component {
  state = {
    cards: [
      {
        url: '/wj/new',
        cover: 'form',
        color: '#a1afc9',
        title: '创建问卷'
      },
      {
        url: '/wj/list',
        cover: 'table',
        color: '#f9906f',
        title: '查看问卷'
      }
    ]
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <Row type="flex" justify="center">
          {this.state.cards.map((item, idx) => (
            <Link to={item.url} key={idx}>
              <Card
                hoverable
                cover={<Icon type={item.cover} />}
                style={{ color: `${item.color}` }}
                className="nav-card"
              >
                <p>{item.title}</p>
              </Card>
            </Link>
          ))}
        </Row>
      </BasicLayout>
    );
  }
}

export default Home;
