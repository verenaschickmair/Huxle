<script lang="ts">
import HuxleKeyboard from "@/components/HuxleKeyboard.vue";
import WordRow from "@/components/WordRow.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { defineComponent, ref } from "vue";

const ENTER = "{enter}";
const BACKSPACE = "{bksp}";
const END_DURATION = 600;

export default defineComponent({
  components: {
    WordRow,
    HuxleKeyboard,
    // eslint-disable-next-line vue/no-reserved-component-names
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  methods: {
    handleInput(key: string) {
      if (this.state.currentGuessIndex >= 6 || this.hasWon || this.hasLost) {
        return;
      }
      const currentGuess = this.state.guesses[this.state.currentGuessIndex];
      if (key == ENTER) {
        this.handleSubmit();
      } else if (key == BACKSPACE) {
        this.state.guesses[this.state.currentGuessIndex] = currentGuess.slice(
          0,
          -1
        );
      } else if (currentGuess.length < 5 && key.length == 1) {
        const alphabetRegex = /[a-zA-Z]/;
        if (alphabetRegex.test(key)) {
          this.state.guesses[this.state.currentGuessIndex] += key;
        }
      }
    },
    handleSubmit() {
      const currentGuess = this.state.guesses[this.state.currentGuessIndex];
      const solution = this.$props.solution;
      if (solution == undefined) {
        return;
      }
      if (currentGuess.length === 5) {
        this.state.currentGuessIndex++;
        for (let i = 0; i < currentGuess.length; i++) {
          let currentChar = currentGuess.charAt(i);

          switch (true) {
            case currentChar === solution.charAt(i):
              this.state.guessedLetters.found.push(currentChar);
              this.state.guessOrder.push("found");
              break;
            case solution.indexOf(currentChar) !== -1:
              this.state.guessedLetters.hint.push(currentChar);
              this.state.guessOrder.push("hint");
              break;
            default:
              this.state.guessedLetters.miss.push(currentChar);
              this.state.guessOrder.push("miss");
              break;
          }
        }
        if (this.hasWon) {
          this.handleWin();
          return;
        }
        if (this.hasLost) {
          this.handleLost();
          return;
        }
      }
    },
    fillArrays() {
      while (this.state.guesses.length < 6) {
        this.state.guesses.push("");
      }
    },
    addRowState(letterStates: string[]) {
      this.state.guessOrder.concat(letterStates);
    },
    async handleWin() {
      await new Promise((resolve) => setTimeout(resolve, END_DURATION));
      this.won = true;
    },
    async handleLost() {
      await new Promise((resolve) => setTimeout(resolve, END_DURATION));
      this.lost = true;
    },
  },
  mounted() {
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      let key =
        e.keyCode === 13
          ? ENTER
          : e.keyCode === 8
          ? BACKSPACE
          : e.key.toLowerCase();
      this.handleInput(key);
    });

    this.fillArrays();
  },
  computed: {
    hasWon(): Boolean {
      return (
        this.state.guesses[this.state.currentGuessIndex - 1] ==
        this.$props.solution
      );
    },
    hasLost(): Boolean {
      return !this.hasWon && this.state.currentGuessIndex >= 6;
    },
  },
  data() {
    return {
      open: ref(true),
      won: false,
      lost: false,
      state: {
        guesses: [] as string[],
        currentGuessIndex: 0,
        guessedLetters: {
          miss: [] as string[],
          found: [] as string[],
          hint: [] as string[],
        },
        guessOrder: [] as string[],
      },
    };
  },
  props: {
    solution: {
      type: String,
    },
  },
});
</script>

<template>
  <div class="flex flex-col h-screen max-w-md mx-auto justify-evenly">
    <div>
      <WordRow
        v-for="(guess, i) in state.guesses"
        :key="i"
        :value="guess"
        :solution="$props.solution"
        :submitted="i < state.currentGuessIndex"
        @letterRowState="addRowState($event)"
      />
    </div>
    <HuxleKeyboard
      @onKeyPress="handleInput"
      :guessedLetters="state.guessedLetters"
    />
  </div>

  <TransitionRoot as="template" :show="open" v-if="won || lost">
    <Dialog as="div" class="relative z-10" @close="open = false">
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
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
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
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                    v-if="won"
                    >You won!</DialogTitle
                  >
                  <DialogTitle
                    v-else
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                    >You lost!</DialogTitle
                  >
                  <p class="text-sm text-gray-500" v-if="won">
                    Share your result with your friends
                  </p>

                  <div class="mt-2 flex justify-center" v-if="won">
                    <div class="w-20 grid grid-cols-5 gap-1 grid-rows-5">
                      <div
                        class="col-span-1 border flex items-center justify-center h-4"
                        v-for="(item, index) in state.guessOrder"
                        :key="item + index"
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
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                >
                  Share
                </button>
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:text-sm"
                  @click="
                    open = false;
                    $router.back();
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

<style>
.green-box {
  @apply border-green-600;
  @apply bg-green-500;
}

.gray-box {
  @apply border-gray-600;
  @apply bg-gray-500;
}

.yellow-box {
  @apply border-yellow-600;
  @apply bg-yellow-500;
}
</style>
