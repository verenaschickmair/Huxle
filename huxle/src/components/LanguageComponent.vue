<template>
  <button
    v-for="(language, i) in languages"
    :key="i"
    class="px-1"
    :class="{
      selected: language === selectedLanguage,
    }"
    @click="onButtonClick(language)"
  >
    {{ language }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { LanguageType } from "@/components/LanguageType";

export default defineComponent({
  data() {
    return {
      languages: ["DE", "EN"] as Array<LanguageType>,
      selectedLanguage: "DE" as LanguageType,
    };
  },
  methods: {
    onButtonClick(language: LanguageType) {
      if (language != this.selectedLanguage) {
        this.selectedLanguage = language;
        this.$emit("languageSelected", this.selectedLanguage);
      }
    },
  },
  emits: ["languageSelected"],
});
</script>

<style>
button.selected {
  @apply font-bold;
}
</style>
