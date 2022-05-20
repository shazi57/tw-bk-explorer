<script>
import { storeToRefs } from 'pinia';
import { useBlockStore } from '../store/blockStore';
import BlockComp from '../components/BlockComp.vue';

export default {
  components: {
    BlockComp,
  },
  beforeRouteEnter(to, from, next) {
    const { getBlock } = useBlockStore();
    if (to.params.id) {
      const searchTerm = to.params.id.substring(0, 2) === '0x' ? to.params.id
        : Number(to.params.id);

      getBlock(searchTerm)
        .then(() => {
          next();
        });
    }
  },
  setup() {
    const { currentBlock } = storeToRefs(useBlockStore());
    return { currentBlock };
  },
};

</script>

<template>
  <BlockComp :block="currentBlock" />
</template>

<style>

</style>
