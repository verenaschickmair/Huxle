<script lang="ts">
import {defineComponent} from "vue";
import HuxleKeyboard from "@/components/HuxleKeyboard.vue";
import WordRow from "@/components/WordRow.vue";

export default defineComponent({
  components: {WordRow, HuxleKeyboard},
  methods: {
    handleInput(key:string){
      console.log(key)
    }
  },
  mounted() {
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      let key =
          e.keyCode == 13 ? "{enter}"
              : e.keyCode == 8 ? "{bksp}"
                  : e.key.toLowerCase();
      this.handleInput(key);
    })
  },
  data() {
    return {
      state: {
        solution: "books",
        guesses: ["", "", "", "", "", ""],
        currentGuessIndex: 0,
      }
    };
  }
});
</script>

<template>
  <div class="flex flex-col h-screen max-w-md mx-auto justify-evenly">
    <div>
      <WordRow
          v-for="(guess,i) in this.state.guesses"
          :key="i"
          :value="guess"
          :solution="this.state.solution"
          :submitted="i < this.state.currentGuessIndex"/>
    </div>
  <HuxleKeyboard @onKeyPress="handleInput" />
  </div>
</template>

<style>

</style>