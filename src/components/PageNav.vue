<script setup>
import { ref } from 'vue';

const props = defineProps({
  curr: Number,
  last: Number,
  bpp: Number,
  block: Boolean,
  blockNumber: Number,
});

const searchTerm = ref(null);
</script>
<template>
  <div id="container">
    <router-link
      v-if="props.curr > 1"
      id="previous"
      v-slot="{ href, navigate }"
      :to="`/blocks?p=${props.curr-1}`"
    >
      <button
        :href="href"
        class="button"
        @click="navigate"
      >
        <img src="../assets/left.svg">
      </button>
    </router-link>
    <div id="totalPages">
      {{ `total of ${Math.ceil(last / bpp)} pages` }}
    </div>
    <router-link
      v-if="props.curr < Math.ceil(last / bpp)"
      id="next"
      v-slot="{ href, navigate }"
      :to="`/blocks?p=${props.curr+1}`"
    >
      <button
        :href="href"
        class="button"
        @click="navigate"
      >
        <img src="../assets/right.svg">
      </button>
    </router-link>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Block Hash or Block Number"
    >
    <router-link
      id="next"
      v-slot="{ href, navigate }"
      :to="`/block/${searchTerm}`"
    >
      <button
        :href="href"
        class="button"
        @click="navigate"
      >
        <img src="../assets/magnify.svg">
      </button>
    </router-link>
  </div>
</template>

<style>
#container {
  width: 100%;
  background-color: gainsboro;
  height: 5vh;
  display: flex;
}
#totalPages {
  width : 15%;
  padding-top: 1vh;
  font-size: 2vh;
  text-align: center;
}
input[type=text] {
  margin-right: 3vh;
  margin-top: 0.8vh;
  border: none;
  margin-left: auto;
  height: 3vh;
  width: 15vw;
  font-size: 15px;
}
button {
  border: none;
  height: 2.3vw;
  width : 2.3vw;
}
</style>
