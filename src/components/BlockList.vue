<script setup>
import { ethers } from 'ethers';
import timeAgo from '../lib/timeAgo';

const props = defineProps({
  blocks: Object,
});
</script>

<template>
  <div id="listContainer">
    <div class="block-row headers">
      <div>Block Number</div>
      <div>Time Stamp</div>
      <div>Transactions</div>
      <div>Miner</div>
      <div>Gas Used</div>
      <div>Gas Limit</div>
      <div class="base-fee-header">
        Base Fee Per Gas (Gwei)
      </div>
    </div>
    <div
      v-for="block in props.blocks"
      :key="block.id"
    >
      <div
        v-if="block.result"
        class="block-row"
      >
        <div class="block-number">
          <router-link
            :to="`/block/${Number(block.result.number)}`"
          >
            {{ Number(block.result.number) }}
          </router-link>
        </div>
        <div>
          {{ timeAgo.format(Number(block.result.timestamp * 1000)) }}
        </div>
        <div class="transactions">
          <router-link
            :to="`/txes?block=${Number(block.result.number)}`"
          >
            {{ Number(block.result.transactions.length) }}
          </router-link>
        </div>
        <div class="miner">
          {{ block.result.miner }}
        </div>
        <div class="gasUsed">
          {{ Number(block.result.gasUsed).toLocaleString('en-US') }}
        </div>
        <div class="gasLimit">
          {{
            Number(block.result.gasLimit).toLocaleString('en-US')
          }}
        </div>
        <div class="baseFeePerGas">
          {{
            block.result.baseFeePerGas
              ? ethers.utils.formatUnits(BigInt(block.result.baseFeePerGas), 'gwei')
              : 'N/A'
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.miner {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.base-fee-header{
  font-size: .7vw;
}
.headers {
  font-weight: bold;
}
.block-row {
  display: grid;
  grid-template-columns: repeat(3, 8vw) 22vw repeat(5, 8vw);
  column-gap: 1vw;
}
#listContainer {
  /* color: #42b983; */
  margin-top: 3vh;
  display: grid;
  grid-template-rows: repeat(20, 5vh);
}
</style>
