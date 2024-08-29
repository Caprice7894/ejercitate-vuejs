
<template>
	<div>
		<form action="" @submit.prevent="submit">
			<div>
				<label for="name">Nombre</label>
				<input type="text" name="name" id="name" v-model="user.name">
			</div>
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
					email:'',
					password:'',
					name:''
				});

	const submit = async ()=>{
		csrf();
		const {data} = await axios.post('/api/users', user.value);
		if(data === "Registrado Correctamente"){
			router.push('/login')
		}else{
			alert(data)
		}

	}
</script>
