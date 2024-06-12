<template>
  <n-form
      require-mark-placement="left"
      :model="formParams"
      :rules="MenuFormRules"
      ref="formRef"
      label-placement="left"
      :label-width="100"
      class="py-4"
  >
    <n-form-item label="应用" path="applicationId">
      <application-select @on-change="handleMenuApplicationUpdateValue"
                          v-model="formParams.applicationId"/>
    </n-form-item>
    <n-form-item label="名称" path="name">
      <n-input placeholder="请输入标题" v-model:value="formParams.name"/>
    </n-form-item>
    <n-form-item label="编码" path="code">
      <n-input placeholder="请输入编码" v-model:value="formParams.code"/>
    </n-form-item>
    <n-form-item label="类型" path="type">
      <n-radio-group @update:value="(s) => formParams.type = s" v-model:value="formParams.type" name="type">
        <n-space>
          <n-radio v-for="option in menuTypes"
                   :key="option.value"
                   :value="option.value">{{ option.label }}
          </n-radio>
        </n-space>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="路径" path="path2">
      <n-input placeholder="请输入路径，子页面不需要以“/”开头" v-model:value="formParams.path2"/>
    </n-form-item>
    <n-form-item label="组件" path="component2">
      <n-input placeholder="请输入组件，子组件必填" v-model:value="formParams.component2"/>
    </n-form-item>
    <n-form-item label="Icon" path="icon">
      <n-input placeholder="请输入Icon" v-model:value="formParams.icon"/>
    </n-form-item>
    <n-form-item label="排序" path="sequence">
      <n-input-number placeholder="排序，值越小排行越前" v-model:value="formParams.sequence"/>
    </n-form-item>
    <n-form-item path="auth" style="margin-left: 100px">
      <n-space>
        <n-button type="primary" :loading="subLoading" @click="formSubmit">保存修改</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>
<script setup lang="tsx">

import ApplicationSelect from "@/views/iam/menu/ApplicationSelect.vue";
import {useMessage} from "naive-ui";
import {reactive, ref, toRefs, watch} from "vue";
import {updateMenu} from "@/api/iam/menu-api";
import {MenuCommand, MenuFormRules} from "@/views/iam/menu/menu";
import {menuTypes} from "@/views/iam/menu/menuConst";

const handleSuccessEvent = 'handleSuccess';

const emit = defineEmits([handleSuccessEvent])

const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});

const formParams = reactive<MenuCommand>({
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


watch(() => props.menu, (newValue) => {
  Object.assign(formParams, newValue)
}, {immediate: true});

const subLoading = ref(false);
const formRef: any = ref(null);
const message = useMessage();

function handleReset() {
  // const treeItem = getTreeItem(unref(treeData), treeItemKey.value[0]);
  // Object.assign(formParams, treeItem);
}

const handleMenuApplicationUpdateValue = (app: any) => {
  formParams.applicationId = app.id
}

function formSubmit() {
  formRef.value.validate(async (errors: boolean) => {
    if (!errors) {
      try {
        await updateMenu(formParams)
        message.success('保存成功');
        emit(handleSuccessEvent)
      } catch (e) {
        console.log(e)
        message.success('保存失败');
      }
    } else {
      message.error('请填写完整信息');
    }
  });
}


</script>