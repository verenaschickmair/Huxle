<template>
<button class="border-gray-200 border-2 bg-gray-1000 px-4 py-2 m-1"
        :class="{
      miss: keyType.state === 'miss',
      found: keyType.state === 'found',
      hint: keyType.state === 'hint',
    }"
>
  {{keyType.input}}
</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {KeyType} from "@/types/KeyType";


export default defineComponent({
  name: "KeyboardLetter",
  props: {
    keyType: {
      type: KeyType
    }
  }
})
</script>

<style scoped>
button.miss {
  @apply bg-gray-500 !important;
  @apply text-white;
}

button.found {
  @apply bg-green-600 !important;
  @apply text-white;
}

button.hint:not(.found) {
  @apply bg-yellow-500 !important;
  @apply text-white;
}
</style>