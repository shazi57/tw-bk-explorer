<script setup>
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import BlockList from '../components/BlockList.vue';
import PageNav from '../components/PageNav.vue';
import { useMainStore } from '../store/mainStore';

const route = useRoute();
const { p } = route.query;
const { fetchBlocks } = useMainStore();
onBeforeRouteUpdate(async (to) => {
  try {
    fetchBlocks(to.query.p);
  } catch (err) {
    throw new Error(err.message);
  }
});
fetchBlocks(p);

const {
  currentBlocks, currPage, latestBlock, blocksPerPage,
} = storeToRefs(useMainStore());
</script>

<template>
  <PageNav
    :curr="currPage"
    :last="latestBlock"
    :bpp="blocksPerPage"
    :block="true"
  />
  <BlockList :blocks="currentBlocks" />
</template>
