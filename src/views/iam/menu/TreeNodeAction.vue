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
  setup(props, {emit}) {

    const state = reactive({
      node: props.node
    });

    function addChildNode() {
      console.log('add node', state.node)
      emit('add-child-node', state.node);
    }

    function removeNode() {
      console.log('remove node', state.node)
      emit('remove-node', state.node);
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
