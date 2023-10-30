<script setup>
import { inject } from 'vue'
let studentData = inject('studentData')
if (studentData && localStorage.getItem('token')) {
  window.location.href = '/portfolio'
}
</script>
<template>
  <div>{{ studentData?.name }}</div>
</template>
<style scoped>
* {
  color: white;
}
</style>
