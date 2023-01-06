<script>
export default {
  name: "SimpleInputField"
}
</script>

<template>
  <div class="mt-1">
    <input
        type="text"
        id="code"
        v-model="code"
        class="py-3 block w-80 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
    />
  </div>
</template>

<style scoped></style>