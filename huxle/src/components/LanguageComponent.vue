<template>
  <div class="w-full text-center text-lg py-8">
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

  <ModalComponent
    v-if="showModal"
    :open="true"
    description="Do you really want to change the language?"
    :switchLanguage="true"
    @answer="changeLanguage($event)"
    @close="showModal = false"
  />
</template>

<script lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
import type { LanguageType } from "@/types/LanguageType";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ModalComponent,
  },
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
        this.showModal = true;
      }
    },
    changeLanguage(answer: boolean) {
      if (answer) {
        let language = this.languages.find(
          (lang) => lang !== this.selectedLanguage
        );
        if (language) {
          this.selectedLanguage = language;
          this.$emit("languageSelected", this.selectedLanguage);
          this.showModal = false;
        }
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
