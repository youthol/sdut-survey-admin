import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button } from 'antd';

const { Column } = Table;

const ExistDataList = props => {
  const { token } = sessionStorage;
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
            render={text => (
              <Button.Group>
                <Button icon="edit" disabled onClick={e => props.HandleJumpPage(7)} />
                <Button
                  icon="area-chart"
                  href={`https://api.youthol.cn/api/ques/${text.id}/export?token=${token}`}
                  // onClick={e => props.HandleJumpPage(7, 2)}
                />
                <Button icon="eye-o" href={`https://lab.youthol.cn/app/survey/#/${text.id}`} />
                <Button icon="delete" onClick={e => props.handleDelete(text.id)} />
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
