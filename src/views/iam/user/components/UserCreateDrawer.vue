<template>
  <n-drawer v-model:show="isDrawer"
            :width="width"
            :placement="placement">
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
          <n-input type="password" placeholder="请输入密码" v-model:value="formParams.password"/>
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button>
          <n-button @click="handleReset">取消</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="tsx" setup>

import {reactive, ref, toRefs} from 'vue';
import {useMessage} from 'naive-ui';
import UserRequest from "@/api/iam/model/userModel";
import {createUser} from "@/api/iam/user";
import md5 from "md5/md5";

const message = useMessage();

const formRef: any = ref(null);

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

const handleSuccessEvent = 'handleSuccess';
const emit = defineEmits([handleSuccessEvent])

defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 450,
  },
});

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
  formRef.value.validate(async (errors) => {
    if (!errors) {
      try {
        const form = {...state.formParams}
        form.password = md5(form.password)
        const data = await createUser(form)
        emit(handleSuccessEvent, {})
        message.success('新建成功');
        handleReset();
        closeDrawer();
      } catch (e) {
        console.log(e)
      }
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
  placement
} = toRefs(state)

defineExpose({
  closeDrawer,
  openDrawer
});

</script>
