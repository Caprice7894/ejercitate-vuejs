
<template>
	<div>
		<form action="" @submit.prevent="submit">
			<div>
				<label for="email">Email</label>
				<input type="email" name="email" id="email" v-model="user.email">
			</div>
			<div>
				<label for="password">Password</label>
				<input type="password" name="password" id="password" v-model="user.password">
			</div>
			<input type="submit" name="submit" id="submit" value="Iniciar Sesion">
		</form>
	</div>
</template>

<script setup>
	import {userData, authState} from '../storage/user.js'
	import { ref } from 'vue';
	import {axios, csrf} from '../axios.js';
	import router from '../router';

	const user = ref({
					email:'danielcanache7894@gmail.com',
					password:'12345678'
				});

	const submit = async ()=>{
		csrf();
		const {data} = await axios.post('/api/auth', user.value);

		userData.value.id = data.user.id;
		userData.value.name = data.user.name;
		userData.value.token = data.token;
		//axios.defaults.headers['Authorization'] = 'Bearer ' + userData.value.token
		console.log(userData.value)
		authState.value = true;
		router.push('/')
	}
</script>