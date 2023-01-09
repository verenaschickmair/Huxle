<template>
  <div class="w-full px-8 sm:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto mt-8 md:mt-16">
    <div class="flex justify-center flex-wrap items-center gap-2">
      <KeyboardLetter
        v-for="(keyType, i) in keyTypes"
        :key="i"
        :key-type="keyType"
        @click="$emit('onKeyPress', keyType.output)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import KeyboardLetter from "@/components/KeyboardLetter.vue";
import { GuessedLetters } from "@/types/GuessedLetters";
import { KeyClass } from "@/types/KeyType";
import type { LetterState } from "@/types/LetterState";
import { defineComponent } from "vue";

export default defineComponent({
  name: "KeyboardComponent",
  components: { KeyboardLetter },
  emits: {
    onKeyPress(key: string) {
      return true;
    },
  },
  data() {
    return {
      keyTypes: [
        new KeyClass("Q", "Q", "empty"),
        new KeyClass("W", "W", "empty"),
        new KeyClass("E", "E", "empty"),
        new KeyClass("R", "R", "empty"),
        new KeyClass("T", "T", "empty"),
        new KeyClass("Z", "Z", "empty"),
        new KeyClass("U", "U", "empty"),
        new KeyClass("I", "I", "empty"),
        new KeyClass("O", "O", "empty"),
        new KeyClass("P", "P", "empty"),

        new KeyClass("A", "A", "empty"),
        new KeyClass("S", "S", "empty"),
        new KeyClass("D", "D", "empty"),
        new KeyClass("F", "F", "empty"),
        new KeyClass("G", "G", "empty"),
        new KeyClass("H", "H", "empty"),
        new KeyClass("J", "J", "empty"),
        new KeyClass("K", "K", "empty"),
        new KeyClass("L", "L", "empty"),

        new KeyClass("Y", "Y", "empty"),
        new KeyClass("C", "C", "empty"),
        new KeyClass("V", "V", "empty"),
        new KeyClass("B", "B", "empty"),
        new KeyClass("N", "N", "empty"),
        new KeyClass("M", "M", "empty"),
        new KeyClass("Backspace", "{bksp}", "empty"),
        new KeyClass("Enter", "{enter}", "empty"),
      ],
    };
  },
  methods: {
    updateState(value: string, state: LetterState) {
      this.keyTypes.forEach((keyType) => {
        if (keyType.hasKey(value) && keyType.canChangeState(state)) {
          keyType.state = state;
        }
      });
    },
  },
  props: {
    guessedLetters: {
      type: GuessedLetters,
    },
  },
  watch: {
    guessedLetters: {
      handler: function () {
        const newGuessedLetters = this.guessedLetters;
        if (newGuessedLetters == undefined) return;

        newGuessedLetters.miss.forEach((value) => {
          this.updateState(value, "miss");
        });
        newGuessedLetters.hint.forEach((value) => {
          this.updateState(value, "hint");
        });
        newGuessedLetters.found.forEach((value) => {
          this.updateState(value, "found");
        });
      },
      deep: true,
    },
  },
});
</script>
