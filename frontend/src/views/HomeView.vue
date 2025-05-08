<template>
<div>
      <div v-if="!jwtToken">
        <Message v-if="failedLogin" severity="error">Failed to  login!</Message>
        <br>
        <InputText name="username" type="text" placeholder="Username" v-model="addName"/><br><br>
        <InputText name="username" type="password" placeholder="Password" v-model="addPass"/><br><br>
        <Button type="submit" severity="secondary" label="Login" @click="Login"/>
      </div>
      <div v-if="jwtToken">
        <Button type="submit" severity="secondary" label="Logout" @click="Logout"/>
      </div>
</div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, watch, ref  } from "vue";
import useApi, { useApiRawRequest,apiUrl } from "@/models/api";
import { useRouter} from 'vue-router'
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { computed } from 'vue'
const addName = ref('')
const addPass = ref('')
let failedLogin = ref(false);
const router = useRouter()
const jwtToken = computed(() => !!localStorage.getItem("jwt"))
function Logout(){
  localStorage.removeItem('jwt');
  router.go()
}
function Login(){
    const resp = fetch(apiUrl+"Auth"+"?username="+addName.value + "&password=" + addPass.value,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }}).then(function (a) {
        return a.json(); // call the json method on the response to get JSON
    })
    .then(function (json) {
        localStorage.setItem('jwt', json.token)
        router.go()
    })
    failedLogin.value = true
}
</script>
