<script setup>
import { ref } from "vue";
import { RouterView } from "vue-router";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
