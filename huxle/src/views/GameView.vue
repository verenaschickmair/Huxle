<script lang="ts">
import GameControl from "@/components/GameControl.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import type { LanguageType } from "@/types/LanguageType";
import type { WordData } from "@/types/WordData";
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  components: { LanguageComponent, GameControl, ModalComponent },
  data() {
    return {
      selectedLanguage: "DE" as LanguageType,
      word: { wordId: "", wordGerman: "", wordEnglish: "" } as WordData,
      showModal: false,
    };
  },
  methods: {
    handleLanguageChange(language: LanguageType) {
      this.selectedLanguage = language;
    },
  },
  async created() {
    let id = this.$route.params.id;
    console.log("The id is: " + id);

    const { data } = await axios.get(
      `http://localhost:1337/api/words?filters[word_id]=${id}`,
      {
        headers: {
          Authorization:
            "Bearer " +
              "b04ddd8b0e05dfb50ff7b0fb9a2f024f8eae719b45bcc5e0bad8245f8b02f2b45236093e513f3371f980028f8597c309d182ac091c29120d3b5c46b2be5b48f559f1d4bb1110e45067840f2347bf8140d6b32c954b115ebcbb4cd0d3c45ee37e9da8a787462d5d2858c5bf7ce5b87715c7c6604b533b13a0b8644baef35d7f2c",
        },
      }
    );

    if (data.data.length) {
      this.word = {
        wordId: data.data[0].attributes.word_id,
        wordGerman: data.data[0].attributes.word_german,
        wordEnglish: data.data[0].attributes.word_english,
      };
    } else {
      this.showModal = true;
    }
  },
});
</script>

<template>
  <div>
    <LanguageComponent @language-selected="handleLanguageChange($event)" />
    <GameControl
      :solution="word.wordEnglish"
      v-if="selectedLanguage === 'EN'"
    />
    <GameControl
      :solution="word.wordGerman"
      v-else-if="selectedLanguage === 'DE'"
    />
    <ModalComponent
      :open="true"
      headline="Oops..."
      description="Sorry, the given link is invalid."
      v-if="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<style></style>
