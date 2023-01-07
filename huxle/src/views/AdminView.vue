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
    @close="showModal = false"
  />
</template>

<script lang="ts">
import { ApiKey } from "@/api/ApiConfig";
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
              Authorization: "Bearer " + ApiKey,
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
