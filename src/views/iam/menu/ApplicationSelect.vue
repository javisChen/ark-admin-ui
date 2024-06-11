<template>
  <n-select
      :render-label="renderApplicationLabel"
      label-field="name"
      value-field="id"
      v-model:value="localValue"
      :options="applicationOptions"
      @update:value="handleApplicationUpdateValue"
  />
</template>
<script setup lang="tsx">

import {onMounted, ref, toRefs, VNodeChild, watch} from "vue";
import {SelectOption} from "naive-ui";
import {fetchApplications} from "@/api/iam/application-api";

const applicationOptions = ref([])

const props = defineProps({
  modelValue: {
    type: [Number, String],
    required: false,
    default: ''
  },
});

const {modelValue} = toRefs(props);
const localValue = ref(modelValue.value);

watch(modelValue, (newValue) => {
  localValue.value = newValue;
});

const updateModelValueEvent = 'update:modelValue';
const updateValueEvent = 'onChange';


const emit = defineEmits([updateModelValueEvent, updateValueEvent])

const renderApplicationLabel = (option: SelectOption): VNodeChild => {
  return (
      option.name + '（' + option.code + '）'
  )
}

async function loadApplications() {
  const applicationData = await fetchApplications({});
  applicationOptions.value = applicationData;
  localValue.value = applicationData[0].id
  emit(updateValueEvent, applicationData[0])
}

const handleApplicationUpdateValue = (value: string, option: SelectOption) => {
  emit(updateValueEvent, option)
}


onMounted(async () => {

  await loadApplications();

});


</script>