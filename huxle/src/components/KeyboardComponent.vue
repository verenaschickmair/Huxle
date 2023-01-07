<template>
  <div>
    <div class="flex w-full justify-center">
    <KeyboardLetter
      v-for="(keyType, i) in keyBoardRow1"
      :key="i"
      :key-type="keyType"
      @click="this.$emit('onKeyPress', keyType.output)"
    />
    </div>
    <div class="flex w-full justify-center">
      <KeyboardLetter
          v-for="(keyType, i) in keyBoardRow2"
          :key="i"
          :key-type="keyType"
          @click="this.$emit('onKeyPress', keyType.output)"
      />
    </div>
    <div class="flex w-full justify-center">
      <KeyboardLetter
          v-for="(keyType, i) in keyBoardRow3"
          :key="i"
          :key-type="keyType"
          @click="this.$emit('onKeyPress', keyType.output)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KeyboardLetter from "@/components/KeyboardLetter.vue";
import { KeyType } from "@/types/KeyType";
import { GuessedLetters } from "@/types/GuessedLetters";
import type { LetterState } from "@/types/LetterState";

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
        new KeyType("Q", "Q", "empty"),
        new KeyType("W", "W", "empty"),
        new KeyType("E", "E", "empty"),
        new KeyType("R", "R", "empty"),
        new KeyType("T", "T", "empty"),
        new KeyType("Z", "Z", "empty"),
        new KeyType("U", "U", "empty"),
        new KeyType("I", "I", "empty"),
        new KeyType("O", "O", "empty"),
        new KeyType("P", "P", "empty"),

        new KeyType("A", "A", "empty"),
        new KeyType("S", "S", "empty"),
        new KeyType("D", "D", "empty"),
        new KeyType("F", "F", "empty"),
        new KeyType("G", "G", "empty"),
        new KeyType("H", "H", "empty"),
        new KeyType("J", "J", "empty"),
        new KeyType("K", "K", "empty"),
        new KeyType("L", "L", "empty"),

        new KeyType("Enter", "{enter}", "empty"),
        new KeyType("Y", "Y", "empty"),
        new KeyType("C", "C", "empty"),
        new KeyType("V", "V", "empty"),
        new KeyType("B", "B", "empty"),
        new KeyType("N", "N", "empty"),
        new KeyType("M", "M", "empty"),
        new KeyType("Backspace", "{bksp}", "empty"),
      ],
    };
  },
  computed: {
    keyBoardRow1(){
      return this.keyTypes.slice(0,10)
    },
    keyBoardRow2(){
      return this.keyTypes.slice(10,19)
    },
    keyBoardRow3(){
      return this.keyTypes.slice(19,this.keyTypes.length)
    }
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
      handler: function(
        newGuessed: GuessedLetters,
        oldGuessedletter: GuessedLetters
      ) {
        const newGuessedLetters = this.guessedLetters;
        if(newGuessedLetters==undefined) return

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

