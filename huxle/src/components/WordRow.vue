<template>
  <div class="grid max-w-xs grid-cols-5 gap-1 mx-auto mb-1">
  <LetterBox v-for="i in 5" :key="i" :letter="this.value[i-1]"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import LetterBox from "@/components/LetterBox.vue";

export default defineComponent({
  components: {LetterBox},
  props:{
    value:String,
    solution:String,
    submitted:Boolean
  }
});
</script>