<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" closable>
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        label-width="80"
      >
        <n-form-item label="用户名" path="username">
          <n-input placeholder="请输入用户名" v-model:value="formParams.username"/>
        </n-form-item>
        <n-form-item label="手机号" path="mobile">
          <n-input placeholder="请输入手机号" v-model:value="formParams.mobile"/>
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input placeholder="请输入密码" v-model:value="formParams.password"/>
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button>
          <n-button @click="handleReset">重置</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="tsx" setup>

import {reactive, ref, toRefs} from 'vue';
import {useMessage} from 'naive-ui';

const rules = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur',
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur',
  },
  mobile: {
    required: true,
    message: '请输入手机号',
    trigger: 'blur',
  },
};

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 450,
  },
});

const message = useMessage();
const formRef: any = ref(null);

interface UserRequest {
  username: string;
  mobile: string;
  password: string;
}

const userRequestRef = (): UserRequest => ({
  username: '',
  mobile: '',
  password: ''
});

const state = reactive({
  isDrawer: false,
  subLoading: false,
  formParams: userRequestRef(),
  placement: 'right' as const,
  alertText:
    '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',
});

function openDrawer() {
  state.isDrawer = true;
}

function closeDrawer() {
  state.isDrawer = false;
}

function formSubmit() {
  formRef.value.validate((errors) => {
    if (!errors) {
      message.success('添加成功');
      handleReset();
      closeDrawer();
    } else {
      message.error('请填写完整信息');
    }
  });
}

function handleReset() {
  formRef.value.restoreValidation();
  state.formParams = Object.assign(state.formParams, userRequestRef());
}


const {
  isDrawer,
  subLoading,
  formParams,
  placement,
  alertText
} = toRefs(state)

// 使用 defineExpose 显式暴露方法和数据
defineExpose({
  closeDrawer,
  openDrawer
});

// return {
//   ...toRefs(state),
//   // state,
//   formRef,
//   rules,
//   formSubmit,
//   handleReset,
//   openDrawer,
//   closeDrawer,
// };

</script>
