<script setup>
import StudentSettings from '../../components/portfolio/StudentSettings.vue'
import imports from '../../utils/imports'
const { route } = imports()
</script>
<template>
  <div>
    <StudentSettings v-show="route.params.process == 'settings'" />
  </div>
</template>
<style scoped></style>
