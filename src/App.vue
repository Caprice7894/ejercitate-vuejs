<script setup>
import {RouterView, RouterLink} from 'vue-router'
import { ref } from 'vue'
import { authState } from './storage/user.js'

const profilePicture = ref("/images/profiles/ref.jpg")
const isLoggedIn = ref(authState.isLoggedIn)

const permute = ()=> {
  isLoggedIn.value = !isLoggedIn.value
  authState.isLoggedIn = isLoggedIn.value
}

const showNav = ref(true)
</script>

<template>
  <div>
    <nav v-if="showNav">
      <img :src="profilePicture">
      <div>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/ejercicios">Ejercicios</RouterLink>
        <RouterLink to="/planes">Planes</RouterLink>
        <RouterLink to="/perseverancia">Perseverancia</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/logout">Logout</RouterLink>
      </div>
    </nav>
    <button @click="showNav=!showNav">Nav</button>
    <RouterView/>
  </div>  
</template>

<style scoped>
nav{
  position: fixed;
  float:left;
  left:0;
  top:0;
  width:30vw;
  height: 100%;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 125) ;
  border-radius: 0 16px 16px 0;
  background-color:#fff;
  overflow:hidden;
}

nav>img{
  width:128px;
  height:128px;
  margin-top: 12px;
  border-radius:100%;
  object-fit: cover;
  border: 4px solid green;
}

nav>div{
  margin:0.5em;
  padding:0px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

nav>div>a{
  border-radius:8px;
  background-color:green;
  color:white;
  padding:0.5em 0;
  margin: 0.5em;
}
</style>
