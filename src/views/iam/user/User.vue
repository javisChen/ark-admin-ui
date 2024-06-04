<template>
  <div>
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
          @update:checked-row-keys="onCheckedRow">

        <template #tableTitle>
          <n-button type="primary" @click="openCreateDrawer">
            <template #icon>
              <n-icon>
                <PlusOutlined/>
              </n-icon>
            </template>
            新建用户
          </n-button>
        </template>

        <template #toolbar>
        </template>

      </BasicTable>

      <user-form ref="createDrawerRef"
                 title="新增用户"
                 @handle-success="handleCreateSuccess"/>
    </n-card>
  </div>
</template>


<script lang="tsx" setup>
import {reactive, ref, h} from 'vue';
import {BasicTable, TableAction} from '@/components/Table';
import {fetchUsers} from '@/api/iam/user';
import {DataTableColumns, NTag, useDialog, useMessage} from 'naive-ui';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@vicons/antd';
import {BasicForm, FormSchema, useForm} from "@/components/Form";
import UserForm from "@/views/iam/user/components/UserForm.vue";
import {STATUS_DICT, STATUS_ENABLED} from "@/views/iam/user/userConst";

const message = useMessage();
const dialog = useDialog();
const actionRef = ref();
const createDrawerRef = ref();

const columns: DataTableColumns = [
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
          <NTag type={row.status === STATUS_ENABLED ? 'success' : 'error'}>
            {STATUS_DICT[row.status as number]}
          </NTag>
      );
    }
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 160,
  },
]

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
  return await fetchUsers({...params, ...res});
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
