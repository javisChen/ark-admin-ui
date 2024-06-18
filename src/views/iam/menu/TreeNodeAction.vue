<script lang="tsx">

import {defineComponent, reactive} from "vue";
import {Add, Remove} from "@vicons/ionicons5";

export default defineComponent({
  name: 'TreeNodeAction',
  components: {
    Add,
    Remove,
  },
  props: {
    node: {
      type: Object
    }
  },
  setup() {

    const state = reactive({
      type: 1,
      typeTitle: '基本设置',
    });

    function addChildNode(node) {
      console.log('add node', node)
    }

    function removeNode(node) {
      console.log('remove node', node)
    }

    return {
      addChildNode,
      removeNode,
    };
  },
});

</script>

<template>
  <NButtonGroup>
    <NButton size="tiny" type="info" tertiary circle @click.stop="addChildNode(node)">
      <template #icon>
        <NIcon>
          <Add/>
        </NIcon>
      </template>
    </NButton>
    <NButton size="tiny" type="info" tertiary circle @click.stop="removeNode(node)">
      <template #icon>
        <NIcon>
          <Remove/>
        </NIcon>
      </template>
    </NButton>
  </NButtonGroup>
</template>

<style scoped lang="less">

</style>
