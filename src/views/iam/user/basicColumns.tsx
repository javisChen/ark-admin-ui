import {DataTableColumns, NTag} from 'naive-ui';
import userConst from './userConst';

export const columns: DataTableColumns = [
  // {
  //   title: 'id',
  //   key: 'id',
  //   width: 100,
  // },
  {
    title: '用户名',
    key: 'username',
    width: 100,
  },
  {
    title: '手机号码',
    key: 'mobile',
    width: 100,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (row) => {
      return (
        <NTag type={row.status ? 'success' : 'error'}>
          {row.status ? '启用' : '禁用'}
        </NTag>
      );
    }
  },
  {
    title: '创建时间',
    key: 'gmtCreate',
    width: 160,
  },
];
