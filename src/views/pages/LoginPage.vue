<script setup>
import { ref } from 'vue'
import MessagesViewer from '../../components/MessagesViewer.vue'
if (localStorage.getItem('token')) window.location.href = '/'

const email = ref('')
const password = ref('')
const errors = ref([])
const messages = ref([])
const buttonIsDisable = ref(false)
const login = async (e) => {
  e.preventDefault()
  const data = {
    email: email.value,
    password: password.value
  }
  const params = new URLSearchParams()

  Object.keys(data).forEach((key) => {
    params.append(key, data[key])
  })
  await fetch('http://localhost:3000/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  })
    .then((d) =>
      d.json().then((d) => {
        errors.value = []
        messages.value = []
        if (d.token) {
          if (d.messages)
            d.messages.forEach((e) => {
              messages.value.push(e)
            })
          localStorage.setItem('token', d.token)
          setTimeout(() => {
            window.location.href = '/portfolio'
          }, 1000)
        } else {
          if (d.errors) {
            d.errors.forEach((e) => {
              errors.value.push(e)
            })
          }
        }
      })
    )
    .catch((e) => console.log(e))
}
const closeError = (i) => {
  errors.value.splice(i, 1)
}
const closeMessage = (i) => {
  messages.value.splice(i, 1)
}
</script>
<template>
  <MessagesViewer
    :messages="messages"
    :errors="errors"
    :close-error="closeError"
    :close-message="closeMessage"
    v-show="messages.length > 0 || errors.length > 0"
  />

  <div class="login">
    <form>
      <div class="content">
        <div class="inputbox">
          <div>
            <input
              type="email"
              id="email"
              :value="email"
              @change="(e) => (email = e.target.value)"
              autocomplete="off"
              required
            />
            <label for="email">E-Mail</label>
          </div>
        </div>
        <div class="inputbox">
          <div>
            <input
              type="password"
              id="password"
              :value="password"
              @change="(e) => (password = e.target.value)"
              autocomplete="off"
              required
            /><label for="password">Password</label>
          </div>
        </div>
      </div>
      <button @click="login" :disabled="buttonIsDisable" type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
button {
  width: 90%;

  outline: none;
  border: none;
  background: rgba(0, 0, 0, 0.2);
  color: azure;
  border-radius: 10px;
  font-size: larger;
  text-align: center;
  backdrop-filter: blur(10px);
  margin-bottom: 10px;
}
.login {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
}
.content {
  padding-top: 30px;
  width: 90%;
  height: 150px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}
form {
  /* padding: 10px 0; */
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding-top: 20px;
  margin-top: 50px;
  width: 250px;
  height: 225px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
}
.inputbox {
  display: flex;
  position: relative;
  height: 30px;
}

.inputbox input {
  color: white !important;
  outline: none !important;
  border: none !important;
  width: 200px !important;
  border-bottom: 1px solid white !important;
  background-color: transparent !important;
}
.inputbox label {
  position: absolute;
  top: 5px;
  left: 5px;
  transform: translateY(-50%);
  color: white;
  font-size: 1em;
  pointer-events: none;
  transition: 0.5s;
}
input:focus ~ label,
input:valid ~ label {
  top: -10px;
}
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
@media screen and (max-width: 400px) {
  form {
    width: 70%;
  }
}
</style>
