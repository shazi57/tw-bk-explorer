<script setup>
import { ethers } from 'ethers';
const props = defineProps({
  txes: Object,
});
</script>
<template>
  <div class="tx-container">
    <div class="tx-row headers">
      <div>Txn Hash</div>
      <div>Block</div>
      <div>From</div>
      <div>To</div>
      <div>Value</div>
      <div class="base-fee-header">
        Base Fee Per Gas (Gwei)
      </div>
    </div>
    <div
      v-for="(tx, index) in props.txes"
      :key="index"
      class="tx-row"
    >
      <div class="tx-hash">
        {{ tx.hash }}
      </div>
      <div class="tx-blockNum">
        {{ tx.blockNumber }}
      </div>
      <div class="tx-from">
        {{ tx.from }}
      </div>
      <div class="tx-to">
        {{ tx.to }}
      </div>
      <div class="tx-value">
        {{ ethers.utils.formatEther(tx.value) }} Ether
      </div>
    </div>
  </div>

</template>
<style>
.base-fee-header{
  font-size: .7vw;
}
.headers {
  font-weight: bold;
}
.tx-row {
  display: grid;
  grid-template-columns: repeat(6, 12vw);
  column-gap: 1vw;
}
.tx-container {
  /* color: #42b983; */
  margin-top: 3vh;
  display: grid;
  grid-template-rows: repeat(20, 5vh);
}

.tx-hash, .tx-from, .tx-to{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
