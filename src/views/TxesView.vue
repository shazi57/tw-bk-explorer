<script>
import { storeToRefs } from 'pinia';
import { useBlockStore } from '../store/blockStore';
import PageNav from '../components/PageNav.vue';

export default {
  beforeRouteEnter(to, from, next) {
    const { getBlockWithTransactions } = useBlockStore();
    getBlockWithTransactions()
      .then(() => {
        next();
      });
  },
  setup() {
    const { currentTxes } = storeToRefs(useBlockStore());
    return { currentTxes };
  },
};
</script>

<template>
  <PageNav
    :curr="currPage"
    :last="latestBlock"
    :bpp="blocksPerPage"
  />  <!-- <p>{{ currentTxes }}</p> -->
</template>
