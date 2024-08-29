<script setup>
	import {authState, userData} from '../storage/user.js'

	import {ref, watch} from 'vue'
	import {axios, csrf} from '../axios.js'

	

	const user = ref({})
	user.value = userData.value;

	async function buscar(){
		const {data} = await axios.get('/api/users');
		user.value = data
		user.value.profile_picture = (user.value.profile_picture==="")?
			"/images/profiles/profile.webp":
			user.value.profile_picture;
	}
	watch(authState, buscar)
	
</script>

<template>

	<div class="span-start">
		<h1>{{ user.name }}</h1>
		<div>
			<img :src="user.profile_picture" alt="Foto de perfil">
		</div>
		<div>
			<p>Email: {{ user.email }}</p>
		</div>
		<div>
			Join Date: {{ new Date(user.created_at).toLocaleString('default', {year:'numeric', month:'2-digit', day:'2-digit'}) }}
		</div>
	</div>
	<div class="span-end-fill">
		hola
	</div>
	
</template>

<style scoped>
	.span-start>div>img{
		border-radius: 100%;
  		object-fit: cover;

	}
</style>