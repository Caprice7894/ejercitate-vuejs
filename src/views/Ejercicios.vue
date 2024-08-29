<script setup>
	import {axios} from "../axios.js"
	import {ref} from 'vue'
	import {RouterLink} from 'vue-router'
	
	import Carde from '../components/Carde.vue'

	const memo = {}

	const workouts = ref({})
	const workout = ref({})
	const selected = ref(false)
	const select = (wk)=>{
		selected.value = true;
		workout.value = wk
	}

	const fetch_workouts = async (url)=>{
		if (memo[url] !== undefined){
			workouts.value = memo[url]
			return
		}

		const data = await axios.get(url)
		.then(res=>{
			if (res.status == 200){
				memo[url] = res.data
				workouts.value = res.data
			}

			console.log(res)
		})
	}
	fetch_workouts('/api/workouts')
</script>

<template>
	<div class="span-start">
		<Carde v-for="wk in workouts"
			@clk="()=>select(wk)"
			:name="wk.name"
			:description="wk.description"
			/>
		<RouterLink class="button round" to="/ejercicios/new">+</RouterLink>
	</div> 
	<div class="span-mid" v-if="selected">
		{{ workout.name }}
		<br>
		{{ workout.description }}
		<br>
		{{ workout.video_url }}
		<br>
	</div>
	<div v-if="selected" class="span-end">
		<div v-for="repetitions in workout.repetitions">
			Repeticiones: {{ repetitions.repetition_number }}
			<br>
			Nivel: {{ repetitions.level }}
		</div>
	</div>
</template>

<style scoped>
	.span-start{
		display: flex;
		gap:1em;
		flex-direction:column;
		justify-content:center;
		align-items:center;
	}
</style>