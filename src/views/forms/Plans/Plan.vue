<script setup>
	import {ref} from "vue"
	import {axios} from "../../../axios.js"
	import router from "../../../router"

	const name = ref("")
	const description = ref("")
	const image_url = ref("")
	
	const submitForm = ()=>{
		axios.post('/api/plans',{
			name:name.value,
			description:description.value,
			image_url:image_url.value
		}).then(res=>{
			alert(res.data.result)
			if ( res.status >= 200 && res.status < 300){
				router.push({path:'plans/populate', params: {id:res.data.data.id}, query:{name:name.value}})
			}
		})
	}
</script>

<template>
	<form class="span-full" @submit.prevent="submitForm">
		<div>
			<label for="name">Nombre</label>
			<input type="text" class="inp" v-model="name" name="name" id="name">
		</div>
		<div>
			<label for="description">Descripcion</label>
			<textarea class="inp" v-model="description" name="description" id="description">
			</textarea>
		</div>
		<div>
			<label for="image_url">URL imagen de fondo</label>
			<input type="text" class="inp" v-model="image_url" name="image_url" id="image_url">
		</div>
		<input type="submit">
	</form>
</template>

<style scoped>

</style>