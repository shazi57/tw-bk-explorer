import { defineStore, acceptHMRUpdate } from 'pinia';
import { ethers } from 'ethers';

const { VITE_ALCHEMY_URL } = import.meta.env;

const provider = new ethers.providers.JsonRpcProvider(VITE_ALCHEMY_URL);

export const useBlockStore = defineStore('block', {
  state: () => ({
    currentBlock: null,
    currentTxes: null,
  }),
  actions: {
    async getBlockWithTransactions(blockNumber) {
      try {
        const block = await provider.getBlockWithTransactions(blockNumber);
        this.currentTxes = block.transactions;
      } catch (err) {
        throw new Error('error while fetching block');
      }
    },
    async getBlock(blockNumber) {
      try {
        const block = await provider.getBlock(blockNumber);
        this.currentBlock = block;
      } catch (err) {
        throw new Error('error while fetching block');
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBlockStore, import.meta.hot));
}
