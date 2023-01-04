<script lang="ts">
import HuxleKeyboard from "@/components/HuxleKeyboard.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import WordRow from "@/components/WordRow.vue";
import { defineComponent } from "vue";

const ENTER = "{enter}";
const BACKSPACE = "{bksp}";
const END_DURATION = 600;

export default defineComponent({
  components: {
    WordRow,
    HuxleKeyboard,
    ModalComponent,
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

  <ModalComponent :open="true" headline="You lost!" v-if="lost" />
  <ModalComponent
    :open="true"
    :guessOrder="state.guessOrder"
    headline="You won!"
    description="Share your results with your friends."
    v-if="won"
  />
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
