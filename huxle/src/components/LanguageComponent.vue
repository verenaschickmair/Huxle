<template>
  <div class="text-center text-lg mt-4">
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
  </div>
</template>

<script lang="ts">
import type { LanguageType } from "@/types/LanguageType";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      languages: ["DE", "EN"] as Array<LanguageType>,
      selectedLanguage: "DE" as LanguageType,
      showModal: false,
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
