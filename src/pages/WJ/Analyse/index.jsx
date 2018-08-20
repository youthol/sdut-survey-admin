import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class Analyse extends Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    console.log(id);
  }
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>分析页面</div>
      </BasicLayout>
    );
  }
}
export default Analyse;
