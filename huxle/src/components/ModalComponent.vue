<script lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import clipboardCopy from "clipboard-copy";
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  props: {
    open: Boolean,
    headline: String,
    description: String,
    guessOrder: Array<String>,
    input: String,
    switchLanguage: Boolean,
    redirect: Boolean,
  },
  data() {
    return {
      isOpen: ref(this.open),
      copyText: this.input,
    };
  },
  methods: {
    copyLink() {
      if (this.copyText) {
        clipboardCopy(this.copyText);
      }
    },
    copyGuesses() {
      const guesses = this.guessOrder;
      if (guesses) {
        let emojis = "Hey there, look at my result on Huxle: \n";
        guesses.forEach(function (guess, i) {
          if (i % 5 == 0 && i > 0) emojis += "\n";
          if (guess === "miss") emojis += "⬛";
          if (guess === "hint") emojis += "🟨";
          if (guess === "found") emojis += "🟩";
        });
        clipboardCopy(emojis);
      }
    },
  },
  emits: ["answer", "close"],
});
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="isOpen = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full max-w-sm p-6"
            >
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    v-if="headline"
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                    >{{ headline }}</DialogTitle
                  >

                  <p class="text-sm text-gray-500" v-if="description">
                    {{ description }}
                  </p>

                  <div v-if="input">
                    <div class="mt-4 flex rounded-md shadow-sm">
                      <div
                        class="relative flex flex-grow items-stretch focus-within:z-10"
                      >
                        <div
                          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        ></div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          v-model="copyText"
                          class="block w-full rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        @click="copyLink()"
                        class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  <div class="mt-2 flex justify-center" v-if="guessOrder">
                    <div class="w-auto grid grid-cols-5 gap-1 grid-rows-5">
                      <div
                        class="col-span-1 border flex items-center justify-center h-4 w-4"
                        v-for="(item, index) in guessOrder"
                        :key="index"
                        :class="{
                          'green-box': item === 'found',
                          'gray-box': item === 'miss',
                          'yellow-box': item === 'hint',
                        }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 space-y-2 sm:mt-6">
                <button
                  v-if="guessOrder"
                  @click="copyGuesses()"
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                >
                  Share
                </button>
                <button
                  v-if="switchLanguage"
                  @click="
                    isOpen = false;
                    $emit('answer', true);
                  "
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                >
                  Switch language
                </button>
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                  @click="
                    isOpen = false;
                    $emit('close', isOpen);
                    if (redirect) $router.replace('/');
                  "
                >
                  Back
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
