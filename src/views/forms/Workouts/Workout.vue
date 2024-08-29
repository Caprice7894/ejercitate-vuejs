<script setup>
	import {ref} from "vue"
	import {axios} from "../../../axios.js"
	import router from "../../../router"

	const name = ref("")
	const description = ref("")
	const video_url = ref("")
	const is_time_based = ref(false)
	
	const submitForm = ()=>{
		axios.post('/api/workouts',{
			name:name.value,
			description:description.value,
			video_url:video_url.value,
			is_time_based:is_time_based.value
		}).then(res=>{
			alert(res.data.result)
			if ( res.status >= 200 && res.status < 300){
				router.push({path:'workouts/populate', query:{id:res.data.data.id}})
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
			<label for="video_url">URL video de ejemplo</label>
			<input type="text" class="inp" v-model="video_url" name="video_url" id="video_url">
		</div>
		<div>
			<label for="is_time_based">
			<input type="checkbox" class="inp" v-model="is_time_based" name="is_time_based" id="is_time_based"> Basado en tiempo?</label>
		</div>
		<input type="submit">
	</form>
</template>

<style scoped>

</style>