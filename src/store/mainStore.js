import { defineStore, acceptHMRUpdate } from 'pinia';
import axios from 'axios';

const { VITE_ALCHEMY_URL } = import.meta.env;

export const useMainStore = defineStore('main', {
  state: () => ({
    name: 'victor',
    loaded: false,
    latestBlock: 0,
    currentBlocks: null,
    blocksPerPage: 20,
    currPage: 0,
  }),
  actions: {
    async fetchBlocks(pageNum) {
      if (!this.loaded) {
        await this.setLatestBlockNumber();
      }
      try {
        const latestBlockNumber = this.latestBlock - (pageNum - 1) * this.blocksPerPage;
        const listEnds = latestBlockNumber - this.blocksPerPage;
        const batchQueryParams = [];

        for (let i = latestBlockNumber, j = 0; i > listEnds; i -= 1, j += 1) {
          const blockQueryParam = {
            jsonrpc: '2.0',
            id: j,
            method: 'eth_getBlockByNumber',
            params: [`0x${(i).toString(16)}`, false],
          };
          batchQueryParams.push(blockQueryParam);
        }

        const batchResult = await axios.post(VITE_ALCHEMY_URL, batchQueryParams);
        this.currentBlocks = batchResult.data;
        this.currPage = Number(pageNum);
      } catch (err) {
        const errMessage = err.response.data.error.message;
        throw new Error(errMessage);
      }
    },

    async setLatestBlockNumber() {
      const latestBlockParam = {
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_blockNumber',
        params: [],
      };
      try {
        const res = await axios.post(VITE_ALCHEMY_URL, latestBlockParam);
        const latestBlockNumber = Number(res.data.result);
        this.latestBlock = latestBlockNumber;
        this.loaded = true;
      } catch (err) {
        const errMessage = err.response.data.error.message;
        throw new Error(errMessage);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
