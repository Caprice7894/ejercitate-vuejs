<script setup>
import {RouterView, RouterLink} from 'vue-router'
import { ref, watch } from 'vue'
import { authState, userData } from './storage/user.js'
import {axios, csrf} from './axios.js'
import router from './router'

const profilePicture = ref("/images/profiles/profile.webp")

const checkAuthUser = async ()=>{
  const {data} = await axios.get('/api/users/check');
  authState.value = data.is_authenticated;
  if(authState.value){
    const data1 = await axios.get('/api/users');

    userData.value.id = data1.data.id;
    userData.value.name = data1.data.name;
    userData.value.email = data1.data.email;
    userData.value.created_at = data1.data.created_at;
    userData.value.updated_at = data1.data.updated_at;
    
    const x = (data1.data.profile_picture === "") ?
      "/images/profiles/profile.webp":
      data1.data.profile_picture;
    profilePicture.value = x;
    userData.value.profile_picture = x;
  }
}

checkAuthUser();

const permute = ()=> {
  authState.value = !authState.value
}

const logout = async ()=>{
  await axios.get('/api/auth/logout');
  userData.value.id = null;
  userData.value.name = null;
  userData.value.token = null;
//  axios.defaults.headers['Authorization'] = null
  permute()
}

const showNav = ref(false)
</script>

<template>
  <div>
    <nav v-if="showNav">
      <div v-if="authState">
        <img class="profilePicture" :src="profilePicture">
        <span >{{ userData.name }}</span>
      </div>
      <div>
        <RouterLink class="button" to="/">Inicio</RouterLink>
        <RouterLink class="button" to="/ejercicios">Ejercicios</RouterLink>
        <RouterLink class="button" to="/planes">Planes</RouterLink>
        <RouterLink class="button" to="/perseverancia">Perseverancia</RouterLink>
        <RouterLink class="button" v-if="!authState" to="/login">Login</RouterLink>
          <RouterLink class="button" v-if="!authState" to="/register">Registrarme</RouterLink>
        <button class="button" v-else @click="logout">Logout</button>
      </div>
    </nav>
    <button class="show-nav" @click="showNav=!showNav">
      <svg viewBox="0 0 100 80" width="10" height="10">
        <rect width="100" height="20"></rect>
        <rect y="30" width="100" height="20"></rect>
        <rect y="60" width="100" height="20"></rect>
      </svg>
    </button>
    <main>
      <RouterView/>
    </main>
  </div>  
</template>
