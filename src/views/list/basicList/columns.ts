import { h } from 'vue';
import { NAvatar } from 'naive-ui';
import { BasicColumn } from '@/components/Table';
export interface ListData {
  id: string;
  name: string;
  avatar: string;
  address: string;
  beginTime: string;
  endTime: string;
  date: string;
}
export const columns: BasicColumn<ListData>[] = [
  {
    title: 'id',
    value: 'id',
    width: 100,
  },
  {
    title: '名称',
    value: 'name',
    width: 100,
  },
  {
    title: '头像',
    key: 'avatar',
    width: 100,
    render(row) {
      return h(NAvatar, {
        size: 48,
        src: row.avatar,
      });
    },
  },
  {
    title: '地址',
    value: 'address',
    auth: ['basic_list'], // 同时根据权限控制是否显示
    ifShow: (_column) => {
      return true; // 根据业务控制是否显示
    },
    width: 150,
  },
  {
    title: '开始日期',
    value: 'beginTime',
    width: 160,
  },
  {
    title: '结束日期',
    value: 'endTime',
    width: 160,
  },
  {
    title: '创建时间',
    value: 'date',
    width: 100,
  },
];
