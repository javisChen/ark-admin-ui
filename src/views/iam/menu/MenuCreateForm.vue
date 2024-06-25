<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" closable>
      <n-form
          :model="formParams"
          :rules="MenuFormRules"
          ref="formRef"
          label-placement="left"
          :label-width="100"
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
              <n-radio v-for="option in MenuTypes"
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

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from 'vue';
import {useMessage} from 'naive-ui';
import ApplicationSelect from "@/views/iam/menu/ApplicationSelect.vue";
import {createMenu} from "@/api/iam/menu-api";
import {MenuCommand, MenuFormRules} from "@/views/iam/menu/menu";
import {MenuTypes} from "@/views/iam/menu/menuConst";

export default defineComponent({
  name: 'MenuCreateForm',
  components: {ApplicationSelect},
  props: {
    title: {
      type: String,
      default: '添加顶级菜单',
    },
    width: {
      type: Number,
      default: 450,
    },
  },
  emits: ['handleSuccess'],
  setup(props, {emit}) {
    const message = useMessage();
    const formRef: any = ref(null);
    const defaultValueRef = () => reactive<MenuCommand>({
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
      status: 1,
      type: 0
    });

    const state = reactive({
      isDrawer: false,
      subLoading: false,
      formParams: defaultValueRef(),
      placement: 'right' as const,
      alertText:
          '该功能主要实时预览各种布局效果，更多完整配置在 projectSetting.ts 中设置，建议在生产环境关闭该布局预览功能。',
    });

    const handleMenuApplicationUpdateValue = (app: any) => {
      state.formParams.applicationId = app.id
    }

    function openDrawer() {
      state.isDrawer = true;
    }

    function closeDrawer() {
      state.isDrawer = false;
    }

    function formSubmit() {
      formRef.value.validate(async (errors) => {
        if (!errors) {
          await createMenu(state.formParams)
          message.success('保存成功');
          emit('handleSuccess')
          handleReset();
          closeDrawer();
        } else {
          message.error('请填写完整信息');
        }
      });
    }

    function handleReset() {
      formRef.value.restoreValidation();
      state.formParams = Object.assign(state.formParams, defaultValueRef());
    }

    return {
      ...toRefs(state),
      formRef,
      MenuFormRules,
      MenuTypes,
      handleMenuApplicationUpdateValue,
      formSubmit,
      handleReset,
      openDrawer,
      closeDrawer,
    };
  },
});
</script>
