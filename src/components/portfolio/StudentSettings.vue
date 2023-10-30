<script setup>
import { inject, ref, onMounted } from 'vue'
let studentData = inject('studentData')
if (!localStorage.getItem('token')) {
  window.location.href = '/'
}
const selectedAvatar = ref()
onMounted(() => {
  const fileInput = document.getElementById('file-input')
  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0]

    const reader = new FileReader()
    reader.onload = function (event) {
      const base64Data = event.target.result
      document.getElementById('avatar_preview').src = base64Data
      selectedAvatar.value = base64Data
    }
    reader.readAsDataURL(file)
  })
})

async function sendImage(base64Data) {
  try {
    const params = new URLSearchParams()
    params.append('image', base64Data)

    params.append('token', localStorage.getItem('token'))
    const response = await fetch('http://localhost:3000/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    })

    const data = await response.json()
    location.reload()
  } catch (error) {
    null
  }
}
</script>
<template>
  <div>
    <div class="avatar_preview_div">
      <img :src="studentData?.avatarUrl ?? ''" v-show="studentData" alt="sa" id="avatar_preview" />
    </div>
    <div>
      <input type="file" id="file-input" accept="image/*" />
      <button @click="sendImage(selectedAvatar)">Resmi Yükle</button>
    </div>
  </div>
</template>
<style scoped>
.avatar_preview_div {
  width: 210px;
  height: 210px;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
