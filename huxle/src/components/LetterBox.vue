<template>
  <div class="col-span-1 flex items-center justify-center h-16 uppercase border-2 border-gray-200">
    {{ letter }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props:{
    letter: {
      type:String,
      default:""
    }
  }
})
</script>