import {renderIcon} from '@/utils';
import {
  ApiOutlined,
  AppstoreOutlined,
  DashboardOutlined,
  MenuOutlined, ShopOutlined, ShoppingTwotone,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from '@vicons/antd';

//前端路由图标映射表
export const constantRouterIcon = {
  DashboardOutlined: renderIcon(DashboardOutlined),
  UserOutlined: renderIcon(UserOutlined),
  UserAddOutlined: renderIcon(UserAddOutlined),
  MenuOutlined: renderIcon(MenuOutlined),
  UsergroupAddOutlined: renderIcon(UsergroupAddOutlined),
  ApiOutlined: renderIcon(ApiOutlined),
  AppstoreOutlined: renderIcon(AppstoreOutlined),
  ShopOutlined: renderIcon(ShopOutlined),
  ShoppingTwotone: renderIcon(ShoppingTwotone),
};
