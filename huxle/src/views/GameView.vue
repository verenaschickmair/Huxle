<script lang="ts">
import GameControl from "@/components/GameControl.vue";
import LanguageComponent from "@/components/LanguageComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import type {LanguageType} from "@/types/LanguageType";
import type {WordData} from "@/types/WordData";
import axios from "axios";
import {defineComponent} from "vue";
import {ApiKey} from "@/api/ApiConfig";

export default defineComponent({
  components: {LanguageComponent, GameControl, ModalComponent},
  data() {
    return {
      selectedLanguage: "DE" as LanguageType,
      word: {wordId: "", wordGerman: "", wordEnglish: ""} as WordData,
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

    const {data} = await axios.get(
        `http://localhost:1337/api/words?filters[word_id]=${id}`,
        {
          headers: {
            Authorization:
                "Bearer " + ApiKey,
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
    <LanguageComponent @language-selected="handleLanguageChange($event)"/>
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
