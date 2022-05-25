<script>
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate } from 'vue-router';
import { useBlockStore } from '../store/blockStore';
import PageNav from '../components/PageNav.vue';
import TxesList from '../components/TxesList.vue';

export default {
  components: {
    PageNav,
    TxesList,
  },
  beforeRouteEnter(to, _, next) {
    const store = useBlockStore();
    const { getBlockWithTransactions } = store;
    const blockToQuery = Number(to.query.block);
    getBlockWithTransactions(blockToQuery)
      .then(() => {
        store.currPage = Number(to.query.p);
        next();
      });
  },
  setup() {
    onBeforeRouteUpdate((to) => {
      const store = useBlockStore();
      store.currPage = Number(to.query.p);
    });
    const {
      currentTxes, currBlockNumber, currPage, txesPerPage, pageContent
    } = storeToRefs(useBlockStore());
    return {
      currentTxes, currBlockNumber, currPage, txesPerPage, pageContent,
    };
  },
};
</script>

<template>
  <PageNav
    :curr="currPage"
    :last="currentTxes.length-1"
    :bpp="txesPerPage"
    :block="false"
    :block-number="currBlockNumber"
  />
  <TxesList :txes="pageContent" />
</template>
