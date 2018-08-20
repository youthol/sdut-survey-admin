import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button } from 'antd';

const { Column } = Table;

const ExistDataList = props => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Table dataSource={props.data}>
        <Column title="ID" dataIndex="key" key="key" />
        <Column title="创建者" dataIndex="author" key="author" align="center" />
        <Column title="标题" dataIndex="title" key="title" align="center" />
        <Column
          title="副标题"
          key="subtitle"
          align="center"
          render={text => (
            <div title={text.subtitle}>
              {text.subtitle.length > 20 ? `${text.subtitle.substring(0, 20)}....` : text.subtitle}
            </div>
          )}
        />
        <Column
          title="创建时间"
          key="createdAt"
          align="center"
          render={text => <span>{moment(text.created_at).format('YYYY-MM-DD HH:mm')}</span>}
        />
        <Column
          title="操作"
          key="action"
          align="center"
          render={(text, record) => (
            <Button.Group>
              <Button icon="edit" disabled onClick={e => props.HandleJumpPage(7)} />
              <Button icon="area-chart" onClick={e => props.HandleJumpPage(7, 2)} />
              <Button icon="eye-o" href="" />
              <Button icon="delete" disabled onClick={props.handleDelete} />
            </Button.Group>
          )}
        />
      </Table>
    </div>
  );
};

ExistDataList.propTypes = {
  data: PropTypes.array
};

export default ExistDataList;
