<script setup>
	import {axios} from '../../../axios.js'
	import router from '../../../router'
	import {ref} from 'vue'

	const formulario = ref({
		workouts_ids:[],
		level:1
	})

	const plan = ref(router.currentRoute.value.query.name);

	const workouts = ref([])
	const getWorkouts = async ()=>{
		const data = await axios.get('/api/workouts')
			.then(res=>res.data)
		for(let index = 0; index < data.length; index++){
			workouts.value.push(data[index])
		}
	}
	getWorkouts()

	const submit = ()=>{
		axios.post('/api/plans/' + router.currentRoute.value.params.id, formulario.value)
		.then(res=>{
			console.log(res)
		})
	}
</script>

<template>
	<div class="span-full">
		{{ plan }}
		<form @submit.prevent="submit">
			<div>
				<label for="level">Nivel</label>
				<input type="number" name="level" step="1" id="level" v-model="formulario.level">
			</div>
			<div>
				<label for="ejercicios">Ejercicios</label>
				<div v-for="(workout_id, index) in formulario.workouts_ids">
					<div class="micro-card">
						<select v-model="formulario.workouts_ids[index]" id="">
							<option v-for="workout in workouts" :value="workout.id">{{ workout.name }}</option>
						</select> 
						<b @click="()=>formulario.workouts_ids.pop(index)">Eliminar</b>
					</div>
				</div>
				<b @click="formulario.workouts_ids.push(1)">+</b>
			</div>
			<input type="submit" name="submit" id="submit">
		</form>
	</div>
</template>
<style scoped>
	.micro-card{
		display:flex;
		flex-direction: column;
	}
	.micro-card b{
		border-radius: 8px;
		background-color: red;
		color: white;
		font-weight: 300;
		padding: 0.5em 1em;
		width: fit-content;
		text-align: center;
	}
</style>