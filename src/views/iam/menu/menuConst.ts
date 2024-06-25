export const STATUS_ENABLED = 1
export const STATUS_DISABLED = 2
export const STATUS_DICT = {
    [STATUS_ENABLED]: '已启用',
    [STATUS_DISABLED]: '已禁用'
}

export const ROUTE_TYPE_DICT = {
    1: '菜单路由',
    2: '页面路由',
    3: '页面隐藏路由'
}

export const MenuTypes = [
    {value: 1, label: '侧边栏菜单'},
    {value: 2, label: '内部页面'},
    {value: 3, label: '页面隐藏路由'},
]
