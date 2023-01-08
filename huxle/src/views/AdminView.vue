<template>
  <div
      class="relative bg-gray-400 lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl"
  >
    <div
        class="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block"
        aria-hidden="true"
    >
      <svg
          class="absolute bottom-full left-full translate-y-1/3 -translate-x-2/3 transform xl:bottom-auto xl:top-0 xl:translate-y-0"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
          aria-hidden="true"
      >
        <defs>
          <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
          >
            <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-500"
                fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
            width="404"
            height="384"
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
        />
      </svg>
      <svg
          class="absolute top-full -translate-y-1/3 -translate-x-1/3 transform xl:-translate-y-1/2"
          width="404"
          height="384"
          fill="none"
          viewBox="0 0 404 384"
          aria-hidden="true"
      >
        <defs>
          <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
          >
            <rect
                x="0"
                y="0"
                width="4"
                height="4"
                class="text-gray-500"
                fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
            width="404"
            height="384"
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
        />
      </svg>
    </div>
    <div
        class="relative max-w-md space-y-12 py-12 px-4 sm:max-w-3xl sm:py-16 sm:px-6 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0"
    >
      <div
          class="relative max-w-md space-y-12 py-12 px-4 sm:max-w-3xl sm:py-16 sm:px-6 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0"
      >
        <div class="space-y-3">
          <div>
            <h2
                class="text-3xl my-3 font-bold tracking-tight text-white"
                id="join-heading"
            >
              Create your own Huxle
            </h2>
          </div>
          <div>
            <p
                class="text-xl font-bold tracking-tight text-white"
                id="join-heading"
            >
              German Word
            </p>
            <div class="mt-1">
              <input
                  type="text"
                  id="german"
                  v-model="word.wordGerman"
                  class="py-3 block w-80 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <p
                class="text-xl font-bold tracking-tight text-white"
                id="join-heading"
            >
              English Word
            </p>
            <div class="mt-1">
              <input
                  type="text"
                  id="english"
                  v-model="word.wordEnglish"
                  class="py-3 block w-80 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              />
            </div>
          </div>
          <button
              class="block w-full rounded-md border border-transparent bg-gray-800 py-3 px-5 text-center text-base font-medium text-white shadow-md hover:bg-gray-600 sm:inline-block sm:w-auto"
              @click="upload()"
          >
            Generate Huxle
          </button>
        </div>
      </div>
      </div>
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
import ModalComponent from "@/components/ModalComponent.vue";
import type { WordData } from "@/types/WordData";
import axios from "axios";
import { defineComponent } from "vue";
import { uuid } from "vue-uuid";

export default defineComponent({
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
