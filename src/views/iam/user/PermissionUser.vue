<template>
  <n-card title="用户列表" :bordered="false" class="proCard">

    <BasicForm @register="register"
               @submit="submitQuery"
               @reset="resetQuery">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]"/>
      </template>
    </BasicForm>

    <BasicTable
      title=""
      titleTooltip=""
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      :scroll-x="1360"
      @update:checked-row-keys="onCheckedRow"
    >

      <template #tableTitle>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="openCreateDrawer">
          <template #icon>
            <n-icon>
              <PlusOutlined/>
            </n-icon>
          </template>
          新建用户
        </n-button>
      </template>

    </BasicTable>

    <user-create-drawer ref="createDrawerRef"
                        title="新增用户"
                        @handle-success="handleCreateSuccess"/>
  </n-card>

</template>


<script lang="tsx" setup>
import {reactive, ref, h} from 'vue';
import {BasicTable, TableAction} from '@/components/Table';
import {getUsers} from '@/api/iam/user';
import {columns} from './basicColumns';
import {useDialog, useMessage} from 'naive-ui';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@vicons/antd';
import {BasicForm, FormSchema, useForm} from "@/components/Form";
import UserCreateDrawer from "@/views/iam/user/components/UserCreateDrawer.vue";

const message = useMessage();
const dialog = useDialog();
const actionRef = ref();
const createDrawerRef = ref();

const params = reactive({
  size: 5,
  username: '',
});

function openCreateDrawer(e, id: Number | String) {
  const {openDrawer} = createDrawerRef.value;
  openDrawer(id);
}

const actionColumn = reactive({
  width: 150,
  title: '操作',
  key: 'action',
  fixed: 'right',
  align: 'center',
  render(record) {
    return h(TableAction as any, {
      style: 'text',
      actions: createActions(record),
    });
  },
});

function createActions(record) {
  return [
    {
      label: '编辑',
      type: 'primary',
      icon: EditOutlined,
      onClick: handleEdit.bind(null, record),
      ifShow: () => {
        return true;
      },
      // auth: ['basic_list'],
    },
    {
      label: '删除',
      type: 'error',
      // 配置 color 会覆盖 type
      color: 'red',
      icon: DeleteOutlined,
      onClick: handleDelete.bind(null, record),
      // 根据业务控制是否显示 isShow 和 auth 是并且关系
      ifShow: () => {
        return true;
      },
      // 根据权限控制是否显示: 有权限，会显示，支持多个
      // auth: ['basic_list'],
    }
  ];
}

const loadDataTable = async (res) => {
  return await getUsers({...params, ...res});
};

function onCheckedRow(rowKeys) {
  console.log(rowKeys);
}

function reloadTable() {
  actionRef.value.reload();
}

function handleCreateSuccess(p: any) {
  reloadTable()
}

function handleDelete(record) {
  dialog.info({
    title: '提示',
    content: `您想删除${record.name}`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除成功');
    },
    onNegativeClick: () => {
    },
  });
}

function handleEdit(record) {
  openCreateDrawer({}, record.id as number)
}

function submitQuery(values: Recordable) {
  console.log(values);
  reloadTable();
}

function resetQuery(values: Recordable) {
  console.log(values);
}

const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '用户名',
    componentProps: {
      placeholder: '',
      onInput: (e: any) => {
        console.log(e);
      },
    },
  },
  {
    field: 'mobile',
    component: 'NInputNumber',
    label: '手机',
    componentProps: {
      placeholder: '',
      showButton: false,
      onInput: (e: any) => {
        console.log(e);
      },
    }
  }
]


const [register, {getFieldsValue}] = useForm({
  gridProps: {cols: '1 s:1 m:2 l:3 xl:4 2xl:4'},
  labelWidth: 80,
  schemas,
});

</script>


<!--<script>-->

<!-- import {deleteUser, getUsers, getUser} from '@/api/iam/user-api'-->
<!-- import PermissionUserForm from "./components/PermissionUserForm.vue";-->


<!-- const routeStatusDictionary = {-->
<!--   1: '已启用',-->
<!--   2: '已禁用'-->
<!-- }-->

<!-- const pagination = {-->
<!--   showSizeChanger: true,-->
<!--   position: 'bottom',-->
<!--   size: 'default',-->
<!--   showQuickJumper: true,-->
<!--   pageSizeOptions: ['15', '25', '35', '50'],-->
<!--   defaultCurrent: 1,-->
<!--   defaultPageSize: 15,-->
<!--   total: 0-->
<!-- }-->

<!-- const queryParam = {-->
<!--   current: 1,-->
<!--   size: 15,-->
<!-- }-->

<!-- export default {-->
<!--   name: 'PermissionRoute',-->
<!--   components: {-->
<!--     PermissionUserForm-->
<!--   },-->
<!--   data() {-->
<!--     return {-->
<!--       pagination,-->
<!--       defaultExpandAllRows: false,-->
<!--       tableLoading: false,-->
<!--       advanced: false,-->
<!--       queryParam: {...queryParam},-->
<!--       tableData: [],-->
<!--       columns: [-->
<!--         {-->
<!--           title: '用户名称',-->
<!--           dataIndex: 'username',-->
<!--           width: 50-->
<!--         },-->
<!--         {-->
<!--           title: '手机号码',-->
<!--           dataIndex: 'mobile',-->
<!--           width: 50,-->
<!--           customRender: (text, row, index) => {-->
<!--             return text || '-'-->
<!--           },-->
<!--         },-->
<!--         {-->
<!--           title: '角色',-->
<!--           dataIndex: 'roles',-->
<!--           width: 100,-->
<!--           align: 'left',-->
<!--           scopedSlots: {customRender: 'roles'},-->
<!--         },-->
<!--         {-->
<!--           title: '所属用户组',-->
<!--           dataIndex: 'userGroups',-->
<!--           align: 'left',-->
<!--           width: 100,-->
<!--           scopedSlots: {customRender: 'userGroups'},-->
<!--         },-->
<!--         {-->
<!--           title: '状态',-->
<!--           dataIndex: 'status',-->
<!--           width: 10,-->
<!--           align: "center",-->
<!--           scopedSlots: {customRender: 'status'},-->
<!--         },-->
<!--         {-->
<!--           title: '操作',-->
<!--           width: 50,-->
<!--           align: 'center',-->
<!--           scopedSlots: {customRender: 'action'},-->
<!--         },-->
<!--       ],-->
<!--       selectedRoute: {},-->
<!--       routeStatusDictionary,-->
<!--       userFormVisible: false,-->
<!--     };-->
<!--   },-->
<!--   created() {-->
<!--     this.loadTableData();-->
<!--   },-->
<!--   methods: {-->
<!--     async handleEdit(record) {-->
<!--       const {data} = await getUser({id: record.id})-->
<!--       this.$refs['userForm'].open(data, 'edit')-->
<!--     },-->
<!--     handleTableChange(pagination, filters, sorter) {-->
<!--       this.queryParam.current = pagination.current-->
<!--       this.loadTableData()-->
<!--     },-->
<!--     resetQueryParams() {-->
<!--       this.queryParam = {...queryParam}-->
<!--       this.loadTableData()-->
<!--     },-->
<!--     handleQueryStatusChange(value) {-->
<!--       this.loadTableData()-->
<!--     },-->
<!--     toggleAdvanced() {-->
<!--       this.advanced = !this.advanced;-->
<!--     },-->
<!--     async routeStatusChange(value, route) {-->
<!--       // try {-->
<!--       //   await updateRouteStatus({id: route.id, status: +value.key})-->
<!--       //   await this.loadTableData()-->
<!--       //   this.$message.success('修改成功')-->
<!--       // } catch (e) {-->
<!--       // }-->
<!--     },-->
<!--     getStatusDesc(status) {-->
<!--       return routeStatusDictionary[status]-->
<!--     },-->
<!--     handleFormOnSuccess() {-->
<!--       this.$message.success('保存成功')-->
<!--       this.loadTableData()-->
<!--     },-->
<!--     handleEditFormCancel() {-->
<!--     },-->
<!--     showUserForm() {-->
<!--       this.$refs['userForm'].open()-->
<!--     },-->
<!--     rowKey(record) {-->
<!--       return record.id-->
<!--     },-->
<!--     handleDelete(record) {-->
<!--       this.$confirm({-->
<!--         title: `提示`,-->
<!--         content: `确定要禁用[${record.name}]用户吗？`,-->
<!--         onOk: async () => {-->
<!--           deleteUser({id: record.id})-->
<!--           .then(() => this.loadTableData())-->
<!--         }-->
<!--       })-->
<!--     },-->
<!--     toggleLoading() {-->
<!--       this.tableLoading = !this.tableLoading-->
<!--     },-->
<!--     async loadTableData() {-->
<!--       this.toggleLoading()-->
<!--       const {data} = await getUsers(this.queryParam)-->
<!--       this.tableData = data.records;-->
<!--       this.pagination.total = data.total-->
<!--       this.toggleLoading()-->
<!--     }-->
<!--   }-->
<!-- };-->
<!--</script>-->
