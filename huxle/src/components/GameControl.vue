<script lang="ts">
import HuxleKeyboard from "@/components/HuxleKeyboard.vue";
import WordRow from "@/components/WordRow.vue";
import { defineComponent } from "vue";

const ENTER = "{enter}";
const BACKSPACE = "{bksp}";
const END_DURATION = 600;

async function handleWin() {
  await new Promise((resolve) => setTimeout(resolve, END_DURATION));
  alert("YOU WIN!");
}

async function handleLost() {
  await new Promise((resolve) => setTimeout(resolve, END_DURATION));
  alert("YOU LOOSE!");
}

export default defineComponent({
  components: { WordRow, HuxleKeyboard },
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
      if (currentGuess.length == 5) {
        this.state.currentGuessIndex++;
        for (let i = 0; i < currentGuess.length; i++) {
          let currentChar = currentGuess.charAt(i);
          if (currentChar == solution.charAt(i)) {
            this.state.guessedLetters.found.push(currentChar);
          } else if (solution.indexOf(currentChar) != -1) {
            this.state.guessedLetters.hint.push(currentChar);
          } else {
            this.state.guessedLetters.miss.push(currentChar);
          }
        }
        if (this.hasWon) {
          handleWin();
          return;
        }
        if (this.hasLost) {
          handleLost();
          return;
        }
      }
    },
  },
  mounted() {
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      let key =
        e.keyCode == 13
          ? ENTER
          : e.keyCode == 8
          ? BACKSPACE
          : e.key.toLowerCase();
      this.handleInput(key);
    });
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
      state: {
        guesses: ["", "", "", "", "", ""],
        currentGuessIndex: 0,
        guessedLetters: {
          miss: [] as string[],
          found: [] as string[],
          hint: [] as string[],
        },
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
        v-for="(guess, i) in this.state.guesses"
        :key="i"
        :value="guess"
        :solution="this.$props.solution"
        :submitted="i < this.state.currentGuessIndex"
      />
    </div>
    <HuxleKeyboard
      @onKeyPress="handleInput"
      :guessedLetters="this.state.guessedLetters"
    />
  </div>
</template>

<style></style>
