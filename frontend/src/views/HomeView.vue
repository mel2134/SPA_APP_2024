<template>
<div>
      Username: <input v-model="addName" placeholder="Type here"><br>
      Password: <input v-model="addPass" placeholder="Type here"><br>
      <button @click="Login">Login</button><br><br><br>
</div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, watch, ref  } from "vue";
import useApi, { useApiRawRequest,apiUrl } from "@/models/api";
const addName = ref('')
const addPass = ref('')
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
        console.log(json.token)
    })
}
</script>
