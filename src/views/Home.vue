<script setup>
	import {authState} from '../storage/user.js'
	import {ref} from 'vue'
	import {axios} from '../axios.js'

	const isli = ref(authState.isLoggedIn)

	const users = ref({})

	async function buscar(){
		const {data} = await axios.get('/api/users');
		users.value = data
	}
	buscar()
</script>

<template>
	<div>{{ isli }}</div>

	{{ users }}
</template>