<script setup>
import { inject } from 'vue'
let studentData = inject('studentData')
if (!studentData && !localStorage.getItem('token')) {
  window.location.href = '/'
}
</script>
<template><div>sa</div></template>
<style scoped></style>
