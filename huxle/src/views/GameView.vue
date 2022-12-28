<script lang="ts">
import { defineComponent } from "vue";
import GameControl from "@/components/GameControl.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import type { LanguageType } from "@/components/LanguageType";
import type {WordData} from "@/components/WordData";


export default defineComponent({
  components: { LanguageComponent, GameControl },
  data() {
    return {
      selectedLanguage: "EN" as LanguageType,
      data: {wordId:"", wordGerman:"", wordEnglish:""} as WordData
    };
  },
  methods: {
    handleLanguageChange(language: LanguageType) {
      this.selectedLanguage = language;
    },
  },
  mounted() {
    let id = this.$route.params.id;
    console.log('The id is: ' + id);
  }
});
</script>

<template>
  <div>
    <LanguageComponent @language-selected="handleLanguageChange" />
    <GameControl :solution="data.wordEnglish" v-if="selectedLanguage === 'EN'" />
    <GameControl :solution="data.wordGerman" v-else-if="selectedLanguage === 'DE'" />
  </div>
</template>

<style></style>
