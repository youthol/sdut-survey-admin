import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button } from 'antd';

const { Column } = Table;

const ExistDataList = props => {
  return (
    <div>
      {props.data && (
        <Table dataSource={props.data}>
          <Column title="catid" dataIndex="key" key="key" />
          <Column title="创建者" dataIndex="name" key="name" align="center" />
          <Column title="标题" dataIndex="title" key="title" align="center" />
          <Column
            title="副标题"
            key="description"
            align="center"
            render={text => (
              <div title={text.description}>
                {text.description && text.description.length > 20
                  ? `${text.description.substring(0, 20)}....`
                  : text.description}
              </div>
            )}
          />
          <Column
            title="创建时间"
            key="created_at"
            align="center"
            render={text => <span>{moment(text.created_at).format('YYYY-MM-DD HH:mm')}</span>}
          />
          <Column
            title="操作"
            key="action"
            align="center"
            render={() => (
              <Button.Group>
                <Button icon="edit" disabled onClick={e => props.HandleJumpPage(7)} />
                <Button icon="area-chart" onClick={e => props.HandleJumpPage(7, 2)} />
                <Button icon="eye-o" href="" />
                <Button icon="delete" disabled onClick={props.handleDelete} />
              </Button.Group>
            )}
          />
        </Table>
      )}
    </div>
  );
};

ExistDataList.propTypes = {
  data: PropTypes.array,
};

export default ExistDataList;
