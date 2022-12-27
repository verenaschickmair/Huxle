<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import SimpleKeyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css"
import {ref,onMounted} from "vue";

const keyboard = ref(null)
const emit = defineEmits(["onKeyPress"])
const onKeyPress = (button) => {
  emit("onKeyPress", button);
}

onMounted( () => {
  keyboard.value = new SimpleKeyboard("simple-keyboard", {
    layout: {
      default: [
          "q w e r t y u i o p",
        "a s d f g h j k l",
          "{enter} z x c v b n m {bksp}"
      ],
    },
    onKeyPress: onKeyPress,

  });
});
</script>