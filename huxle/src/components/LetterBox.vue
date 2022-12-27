<template>
  <div
    class="col-span-1 flex items-center justify-center h-16 uppercase border-2 border-gray-200 transition-all duration-200"
    :class="{
      miss: letterState === 'miss',
      found: letterState === 'found',
      hint: letterState === 'hint',
    }"
  >
    {{ letter }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { LetterState } from "@/components/LetterState";

export default defineComponent({
  props: {
    letter: {
      type: String,
      default: "",
    },
    letterState: {
      type: String,
      default: "empty",
    },
  },
});
</script>

<style>
div.miss {
  @apply border-gray-500;
  @apply bg-gray-500;
  @apply text-white;
}

div.found {
  @apply border-green-500;
  @apply bg-green-500;
  @apply text-white;
}
div.hint {
  @apply border-yellow-500;
  @apply bg-yellow-500;
  @apply text-white;
}
</style>
