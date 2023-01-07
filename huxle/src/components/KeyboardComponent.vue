<template>
  <div class="keys">
    <div class="flex w-full justify-center">
      <KeyboardLetter
        v-for="(keyType, i) in keyBoardRow1"
        :key="i"
        :key-type="keyType"
        @click="$emit('onKeyPress', keyType.output)"
      />
    </div>
    <div class="flex w-full justify-center">
      <KeyboardLetter
        v-for="(keyType, i) in keyBoardRow2"
        :key="i"
        :key-type="keyType"
        @click="$emit('onKeyPress', keyType.output)"
      />
    </div>
    <div class="flex w-full justify-center">
      <KeyboardLetter
        v-for="(keyType, i) in keyBoardRow3"
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
import type { KeyType } from "@/types/KeyType";
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

        new KeyClass("Enter", "{enter}", "empty"),
        new KeyClass("Y", "Y", "empty"),
        new KeyClass("C", "C", "empty"),
        new KeyClass("V", "V", "empty"),
        new KeyClass("B", "B", "empty"),
        new KeyClass("N", "N", "empty"),
        new KeyClass("M", "M", "empty"),
        new KeyClass("Backspace", "{bksp}", "empty"),
      ],
    };
  },
  computed: {
    keyBoardRow1(): KeyType[] {
      return this.keyTypes.slice(0, 10);
    },
    keyBoardRow2(): KeyType[] {
      return this.keyTypes.slice(10, 19);
    },
    keyBoardRow3(): KeyType[] {
      return this.keyTypes.slice(19, this.keyTypes.length);
    },
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
