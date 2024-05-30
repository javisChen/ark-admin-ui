import {DataTableColumns, NTag} from 'naive-ui';
import {STATUS_ENABLED, STATUS_DICT} from './userConst';

export const columns: DataTableColumns = [
  {
    title: '用户名12',
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
        <NTag type={row.status === STATUS_ENABLED ? 'success' : 'error'}>
          {STATUS_DICT[row.status as number]}
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
