<script setup>
import { inject } from 'vue'
let studentData = inject('studentData')
</script>
<template>
  <div>{{ studentData?.name }}</div>
</template>
<style scoped></style>
