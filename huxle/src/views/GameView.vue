<script lang="ts">
import GameControl from "@/components/GameControl.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import type { LanguageType } from "@/components/LanguageType";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: { LanguageComponent, GameControl },
  data() {
    return {
      selectedLanguage: "EN" as LanguageType,
    };
  },
  methods: {
    handleLanguageChange(language: LanguageType) {
      this.selectedLanguage = language;
    },
  },
  async mounted() {
    let id = this.$route.params.id;
    console.log("The id is: " + id);

    const { data } = await axios.get(
      `http://localhost:1337/api/words?filters[word_id]=${id}`,
      {
        headers: {
          Authorization:
            "Bearer 24629ab19d2c880888663211a69c74783bf8e690e52783fbf69392b398245060254889e613c11c1be811bf88106d775ac0ecc72e763b7a6e478bae335099f3300b88dd72c77c38be3826342aaca5b5ddaf45450bc4ee1d252145b4190bb80771aa83579f54e2b8af4b7e9af55a76f10412c2a5d281195f43fcbebec139f50182",
        },
      }
    );

    console.log(data);
  },
});
</script>

<template>
  <div>
    <LanguageComponent @language-selected="handleLanguageChange" />
    <GameControl solution="books" v-if="selectedLanguage === 'EN'" />
    <GameControl solution="buche" v-else-if="selectedLanguage === 'DE'" />
  </div>
</template>

<style></style>
