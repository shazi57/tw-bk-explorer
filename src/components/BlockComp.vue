<script setup>
import timeAgo from '../lib/timeAgo';
import { ethers } from 'ethers';

const props = defineProps({
  block: Object,
});
</script>

<template>
  <div class="header">
    <div>
      <h2>Block</h2>
      <h3>#{{ props.block.number }}</h3>
    </div>
    <div id="block-container">
      <div class="b-header">
        Block Number
      </div>
      <div id="b-height">
        {{ Number(props.block.number).toLocaleString('en-US') }}
      </div>
      <div class="b-header">
        Timestamp
      </div>
      <div id="b-timeStamp">
        {{ timeAgo.format(Number(props.block.timestamp * 1000)) }}
      </div>
      <div class="b-header">
        Block Hash
      </div>
      <div id="b-hash">
        {{ props.block.hash }}
      </div>
      <div class="b-header">
        Block Nonce
      </div>
      <div id="b-nonce">
        {{ ethers.utils.commify(ethers.BigNumber.from(props.block.nonce)) }}
      </div>
      <div class="b-header">
        Gas Limit
      </div>
      <div id="b-gasLimit">
        {{ ethers.utils.commify(props.block.gasLimit) }}
      </div>
      <div class="b-header">
        Gas Used
      </div>
      <div id="b-gasUsed">
        {{ ethers.utils.commify(props.block.gasUsed) }}
      </div>
      <div class="b-header">
        Base Fee Per Gas
      </div>
      <div id="b-baseFee">
        {{ ethers.utils.formatUnits(props.block.baseFeePerGas, 'gwei') }} Gwei
      </div>
      <div class="b-header">
        Mined By
      </div>
      <div id="b-miner">
        {{ props.block.miner }}
      </div>
      <div class="b-header">
        Block Difficulty
      </div>
      <div id="b-difficulty">
        {{ ethers.utils.commify(props.block._difficulty) }}
      </div>
      <div class="b-header">
        Transactions
      </div>
      <div id="b-transactions">
        {{ props.block.transactions.length }}
      </div>
    </div>
  </div>
</template>

<style>
#block-container {
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-rows: repeat(10, 7vh);
  grid-template-columns: 20% 80%
}

h2, h3{
  display: inline-block;
}

h3 {
  margin-left: 0.5vh;
  color: grey;
}

</style>
