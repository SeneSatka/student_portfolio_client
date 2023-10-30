<script setup>
import { RouterView } from 'vue-router'
import NavBar from './views/static/NavBar.vue'
import { provide, ref } from 'vue'
import { ascii } from '@senka/text-to-ascii'

const studentData = ref(false)
const useStudentData = async (token) =>
  await fetch(`http://localhost:3000/students?token=${token}`).then((d) =>
    d.json().then((d) => {
      if (d.errors) {
        localStorage.removeItem('token')
        location.reload()
      } else studentData.value = d.data
    })
  )
if (localStorage.getItem('token')) useStudentData(localStorage.getItem('token'))
provide('studentData', studentData)

console.log(`%c${ascii('>>  SeneSatka  <<')}`, 'color:green')
let i = 0
setInterval(() => {
  if (i) {
    console.log("%cIt's dangerous to enter here", 'color:red;font-size:x-larger')
    i = 0
  } else {
    console.log("%cIt's dangerous to enter here", 'color:red;font-size:xx-larger')
    i = 1
  }
}, 2000)
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
