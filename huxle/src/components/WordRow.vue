<template>
  <div class="grid max-w-xs grid-cols-5 gap-1 mx-auto mb-1">
    <LetterBox
      v-for="i in 5"
      :key="i"
      :letter="value ? value[i - 1] : ''"
      :letterState="letterStates[i - 1]"
    />
  </div>
</template>

<script lang="ts">
import LetterBox from "@/components/LetterBox.vue";
import type { LetterState } from "@/types/LetterState";
import { defineComponent } from "vue";

export default defineComponent({
  components: { LetterBox },
  props: {
    value: String,
    solution: String,
    submitted: Boolean,
  },
  data() {
    return {
      letterStates: ["", "", "", "", ""],
    };
  },
  watch: {
    submitted: async function () {
      if (this.$props.submitted) {
        let solution = this.$props.solution;
        let value = this.$props.value;
        if (solution === undefined || value === undefined) {
          return;
        }
        let temp: LetterState[] = ["miss", "miss", "miss", "miss", "miss"];
        let letterPool = [];
        for (let i = 0; i < 5; i++) {
          if (solution.charAt(i) == value.charAt(i)) {
            temp[i] = "found";
          } else {
            letterPool.push(solution.charAt(i));
          }
        }
        for (let i = 0; i < 5; i++) {
          if (temp[i] == "miss") {
            let index = letterPool.indexOf(value.charAt(i));
            if (index != -1) {
              letterPool.splice(index, 1);
              temp[i] = "hint";
            }
          }
          this.letterStates[i] = temp[i];
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        this.$emit("letterRowState", this.letterStates);
      }
    },
  },
});
</script>
