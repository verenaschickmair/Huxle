<template>
  <div>
    <h1>This is an admin page</h1>
    <button @click="upload()" class="border-2 border-red-400 p-4">
      Upload
    </button>
  </div>

  <ModalComponent
    :open="true"
    :input="'http://localhost:5173/' + word.wordId"
    headline="Link to share:"
    v-if="showModal"
  />
</template>

<script lang="ts">
import ModalComponent from "@/components/ModalComponent.vue";
import type { WordData } from "@/types/WordData";
import axios from "axios";
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";

export default defineComponent({
  // TODO create input fields and fill wordGerman and wordEnglish
  components: {
    ModalComponent,
  },
  data() {
    return {
      word: {
        wordId: "",
        wordGerman: "",
        wordEnglish: "",
      } as WordData,
      showModal: false,
    };
  },
  methods: {
    generateUid(): string {
      return uuid.v4().replace("-", "").slice(0, 10);
    },
    checkInputs(): boolean {
      if (this.word.wordEnglish.length !== 5) {
        // TODO Handle input field
        return false;
      }
      if (this.word.wordGerman.length !== 5) {
        // TODO Handle input field
        return false;
      }
      return true;
    },
    async upload() {
      if (!this.checkInputs()) {
        return;
      }
      this.word.wordId = this.generateUid();
      await axios
        .post(
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
        )
        .then((response) => {
          // TODO generate link and show popup
          console.log(response);

          this.showModal = true;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
});
</script>

<style></style>
