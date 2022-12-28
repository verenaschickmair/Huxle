<template>
  <div>
    <h1>This is an admin page</h1>
    <button @click="upload()" class="border-2 border-red-400 p-4">
      Upload
    </button>
  </div>
</template>

<script lang="ts">
import type { WordData } from "@/components/WordData";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      word: {
        wordId: "asdfgh1234",
        wordGerman: "wordl",
        wordEnglish: "wadle",
      } as WordData,
    };
  },
  methods: {
    async upload() {
      const { data } = await axios.post(
        `http://localhost:1337/api/words`,
        {
          data: {
            word_id: this.word.wordId,
            word_german: this.word.wordGerman,
            word_english: this.word.wordEnglish,
          },
        },
        {
          headers: {
            Authorization:
              "Bearer 24629ab19d2c880888663211a69c74783bf8e690e52783fbf69392b398245060254889e613c11c1be811bf88106d775ac0ecc72e763b7a6e478bae335099f3300b88dd72c77c38be3826342aaca5b5ddaf45450bc4ee1d252145b4190bb80771aa83579f54e2b8af4b7e9af55a76f10412c2a5d281195f43fcbebec139f50182",
          },
        }
      );
      console.log(data);
    },
  },
});
</script>

<style></style>
