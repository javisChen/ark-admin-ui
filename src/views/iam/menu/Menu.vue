<template>
  <div>
    <!--    <div class="n-layout-page-header">-->
    <!--      <n-card :bordered="false" title="菜单管理">-->
    <!--      </n-card>-->
    <!--    </div>-->
    <n-grid class="mt-4"
            cols="1 s:1 m:1 l:3 xl:3 2xl:3"
            responsive="screen"
            :x-gap="12">
      <n-gi span="1">
        <n-card :segmented="{ content: true }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-dropdown trigger="hover" @select="selectAddMenu" :options="addMenuOptions">
                <n-button type="info" ghost icon-placement="right">
                  添加菜单
                  <template #icon>
                    <div class="flex items-center">
                      <n-icon size="14">
                        <DownOutlined/>
                      </n-icon>
                    </div>
                  </template>
                </n-button>
              </n-dropdown>
              <n-button type="info" ghost icon-placement="left" @click="packHandle">
                全部{{ expandedKeys.length ? '收起' : '展开' }}
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <AlignLeftOutlined/>
                    </n-icon>
                  </div>
                </template>
              </n-button>
            </n-space>
          </template>
          <div class="w-full menu">
            <n-space vertical>
              <application-select @on-change="handleApplicationUpdateValue"/>
              <n-input type="text" v-model:value="pattern" placeholder="输入菜单名称搜索">
                <template #suffix>
                  <n-icon size="18" class="cursor-pointer">
                    <SearchOutlined/>
                  </n-icon>
                </template>
              </n-input>
            </n-space>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium"/>
                </div>
              </template>
              <template v-else>
                <n-tree
                    block-line
                    :virtual-scroll="true"
                    :pattern="pattern"
                    :data="treeData"
                    key-field="id"
                    label-field="name"
                    :expandedKeys="expandedKeys"
                    style="max-height: 650px; overflow: hidden"
                    @update:selected-keys="selectedTree"
                    @update:expanded-keys="onExpandedKeys"
                    :render-suffix="renderNodeSuffix"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="1">
        <n-card :segmented="{ content: true }" :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-icon size="18">
                <FormOutlined/>
              </n-icon>
              <span>{{ operate }}{{ treeItemTitle ? `：${treeItemTitle}` : '' }}</span>
            </n-space>
          </template>

          <MenuEditForm v-if="isEditMenu"
                        :menu="selectedMenu"
                        @handle-success="loadMenus"/>
        </n-card>
      </n-gi>
    </n-grid>

    <MenuCreateForm @handle-success="loadMenus" ref="menuCreateFormRef" :title="drawerTitle"/>
  </div>
</template>

<script lang="tsx" setup>

import {computed, onMounted, ref, unref} from 'vue';
import {TreeOption, useDialog, useMessage} from 'naive-ui';
import {AlignLeftOutlined, DownOutlined, FormOutlined, SearchOutlined} from '@vicons/antd';
import {fetchMenus} from '@/api/iam/menu-api';
import {getTreeItem} from '@/utils';
import MenuCreateForm from './MenuCreateForm.vue';
import MenuEditForm from "@/views/iam/menu/MenuEditForm.vue";
import ApplicationSelect from "@/views/iam/menu/ApplicationSelect.vue";
import {MenuCommand} from "@/views/iam/menu/menu";
import TreeNodeAction from "@/views/iam/menu/TreeNodeAction.vue";

const menuCreateFormRef = ref();
const message = useMessage();
const dialog = useDialog();

let treeItemKey = ref([]);
let expandedKeys = ref([]);

const treeData = ref([] as Array<any>);

const loading = ref(true);
const isEditMenu = ref(false);
const treeItemTitle = ref('');
const pattern = ref('');
const operate = ref('');
const drawerTitle = ref('');
const selectedApplication = ref()
const selectedMenu = ref<MenuCommand>({
  applicationId: 0,
  code: "",
  component: "",
  component2: "",
  hideChildren: false,
  icon: "",
  id: 0,
  name: "",
  path: "",
  path2: "",
  pid: 0,
  sequence: 0,
  status: 0,
  type: 0
});

const isAddSon = computed(() => {
  return !treeItemKey.value.length;
});

const addMenuOptions = ref([
  {
    label: '添加顶级菜单',
    key: 'home',
    disabled: false,
  },
  {
    label: '添加子菜单',
    key: 'son',
    disabled: isAddSon,
  },
]);


const handleApplicationUpdateValue = (app: any) => {
  selectedApplication.value = app.id
  loadMenus()
}

function selectAddMenu(key: string) {
  drawerTitle.value = key === 'home' ? '添加顶栏菜单' : `添加子菜单：${treeItemTitle.value}`;
  openCreateDrawer();
}

function openCreateDrawer() {
  const {openDrawer} = menuCreateFormRef.value;
  openDrawer();
}

function selectedTree(keys) {
  console.log('keys', keys)
  if (keys.length) {
    const treeItem = getTreeItem(unref(treeData), keys[0]);
    treeItemKey.value = keys;
    treeItemTitle.value = treeItem.name;
    selectedMenu.value = treeItem
    isEditMenu.value = true;
    operate.value = '编辑菜单'
  } else {
    isEditMenu.value = false;
    treeItemKey.value = [];
    treeItemTitle.value = '';
  }
}

function addChildNode(parentNode: MenuCommand) {
  console.log('parent node', parentNode)
  operate.value = '添加子菜单'
  isEditMenu.value = true;
  treeItemKey.value = [];
  treeItemTitle.value = parentNode.name;
  selectedMenu.value = {
    applicationId: parentNode.applicationId,
    code: "",
    component: "",
    component2: "",
    hideChildren: false,
    icon: "",
    name: "",
    path: parentNode.path,
    path2: parentNode.path2,
    pid: parentNode.id,
    sequence: 0,
    status: 1,
    type: 0
  } as MenuCommand
}


function handleDel() {
  dialog.info({
    title: '提示',
    content: `您确定想删除此权限吗?`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      message.success('删除成功');
    },
    onNegativeClick: () => {
      message.error('已取消');
    },
  });
}

function packHandle() {
  if (expandedKeys.value.length) {
    expandedKeys.value = [];
  } else {
    expandedKeys.value = unref(treeData).map((item: any) => item.id as string) as [];
  }
}

async function loadMenus() {
  loading.value = true;
  treeData.value = await fetchMenus({applicationId: selectedApplication.value});
  setTimeout(() => loading.value = false, 300)
}


function renderNodeSuffix({option}: { option: TreeOption }) {
  return (
      <TreeNodeAction node={option} onAddChildNode={addChildNode}/>
  )
}

onMounted(async () => {

});

function onExpandedKeys(keys) {
  expandedKeys.value = keys;
}
</script>
