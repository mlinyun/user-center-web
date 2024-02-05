import { searchUser } from '@/services/ant-design-pro/api';
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Image } from 'antd';
import React, { useRef } from 'react';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: '序号',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    ellipsis: true,
    tip: 'username',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    copyable: true,
    ellipsis: true,
    tip: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={60} height={60} />
      </div>
    ),
  },
  {
    title: '星号',
    dataIndex: 'planetCode',
    copyable: true,
    tip: '星球编号',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 80,
    render: (_, record) => {
      const flag = record.gender;
      return <div>{flag ? '男' : '女'}</div>;
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
  },
  {
    title: '邮件',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    initialValue: 0,
    valueEnum: {
      0: { text: '正常', status: 'Processing' },
      1: { text: '封号', status: 'Error' },
    },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '普通用户', status: 'Default' },
      1: { text: '管理员', status: 'Success' },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const UserManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<API.CurrentUser>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log(sort, filter);
          const userList = await searchUser();
          return {
            data: userList,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户表格"
      />
    </PageContainer>
  );
};
export default UserManage;
