<script lang="ts">
import { defineComponent } from "vue";
import GameControl from "@/components/GameControl.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import type { LanguageType } from "@/components/LanguageType";

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
