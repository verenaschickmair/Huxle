<template>
  <button
    class="h-fit w-fit key_button"
    :class="{
      miss: keyType?.state === 'miss',
      found: keyType?.state === 'found',
      hint: keyType?.state === 'hint',
    }"
  >
    <div class="key_letter">{{ keyType?.input }}</div>
  </button>
</template>

<script lang="ts">
import type { KeyType } from "@/types/KeyType";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  name: "KeyboardLetter",
  props: {
    keyType: {
      type: Object as PropType<KeyType>,
    },
  },
});
</script>

<style lang="scss" scoped>
button.miss {
  background: rgb(107 114 128) !important;
  color: white;
}

button.found {
  background: rgb(34 197 94) !important;
  color: white;
}

button.hint:not(.found) {
  background: rgb(234 179 8) !important;
  color: white;
}

.key_letter {
  min-width: 2rem;
}

.key_button {
  box-sizing: border-box;
  font-size: 1.2rem;
  text-align: center;
  color: #555;
  cursor: pointer;
  padding: 8px;
  border: 1px solid #f2f2f2;
  text-shadow: 0 0.5px 1px #777, 0 2px 6px #f2f2f2;
  border-radius: 10px;
  background: -webkit-linear-gradient(
    top,
    #f9f9f9 0%,
    #e2e2e2 80%,
    #d0d0d0 100%
  );
  display: inline-block;
  transition: box-shadow 0.3s ease, transform 0.15s ease;
  box-shadow: 0 0 1px #888, 0 1px 0 #fff, 0 6px 0 #c0c0c0,
    0 8px 17px rgba(#444, 0.4), 2px 1px 4px rgba(#444, 0.25),
    -2px 1px 4px rgba(#444, 0.25), 0 9px 16px rgba(#444, 0.1);

  &:hover,
  &:focus {
    box-shadow: 0 0 1px #888, 0 1px 0 #fff, 0 4px 0 #c0c0c0,
      0 2px 35px rgba(#444, 0.3), 2px 2px 4px rgba(#444, 0.25),
      -2px 2px 4px rgba(#444, 0.25), 0 7px 4px rgba(#444, 0.1);
    transform: translateY(2px);
  }

  &:active {
    box-shadow: 0 0 1px #888, 0 1px 0 #fff, 0 0 0 #c0c0c0,
      0 0px 30px rgba(#444, 0.15), 2px 2px 4px rgba(#444, 0.25),
      -2px 2px 4px rgba(#444, 0.25), 0 0px 4px rgba(#444, 0.25);
    transform: translateY(4px);
  }
}
</style>
