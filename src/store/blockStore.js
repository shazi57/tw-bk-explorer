import { defineStore, acceptHMRUpdate } from 'pinia';
import { ethers } from 'ethers';

const { VITE_ALCHEMY_URL } = import.meta.env;

const provider = new ethers.providers.JsonRpcProvider(VITE_ALCHEMY_URL);

export const useBlockStore = defineStore('block', {
  state: () => ({
    currBlockNumber: null,
    currentBlock: null,
    currentTxes: null,
    currPage: 1,
    txesPerPage: 20,
  }),
  getters: {
    pageContent: (state) => {
      if (state.currentTxes) {
        const predicate = (_, i) => (
          i >= (state.currPage - 1) * state.txesPerPage
          && i < state.currPage * state.txesPerPage
        );
        const filtered = state.currentTxes.filter(predicate);
        return filtered;
      }
      return null;
    },
  },
  actions: {
    async getBlockWithTransactions(blockNumber) {
      try {
        console.log(blockNumber);
        const block = await provider.getBlockWithTransactions(blockNumber);
        this.currentTxes = block.transactions;
        this.currBlockNumber = blockNumber;
      } catch (err) {
        throw new Error(err.message);
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
