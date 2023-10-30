<script setup>
const props = defineProps({
  messages: { required: true, type: Array },
  errors: { required: true, type: Array },
  closeError: Function,
  closeMessage: Function
})
</script>
<template>
  <div class="messages">
    <div class="error" v-for="(error, index) in props.errors" :key="index">
      {{ error }}
      <i class="fa-solid fa-xmark" style="color: #ffffff" @click="props.closeError(index)"></i>
    </div>
    <div class="message" v-for="(message, index) in props.messages" :key="index">
      {{ message }}
      <i class="fa-solid fa-xmark" style="color: #ffffff" @click="props.closeMessage(index)"></i>
    </div>
  </div>
</template>
<style scoped>
.messages {
  flex-wrap: wrap;
  width: 400px;
  margin: auto;
  height: auto;

  padding: 0 10px;
  padding-top: 10px;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error {
  display: flex;
  position: static;
  width: 300px;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(255, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  padding: 10px;
  border-radius: 10px;
  transition: all 0.4s;
}
.error:hover {
  background-color: rgba(255, 0, 0, 0.6);
}
.message {
  display: flex;
  position: static;
  width: 300px;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(0, 255, 0, 0.4);
  backdrop-filter: blur(20px);
  padding: 10px;
  border-radius: 10px;
  transition: all 0.4s;
}
.message:hover {
  background-color: rgba(0, 255, 0, 0.6);
}
.error i,
.message i {
  margin-left: auto;
}
</style>
