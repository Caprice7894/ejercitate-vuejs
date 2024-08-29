<script setup>
	import {axios} from '../../../axios.js'
	import router from '../../../router'
	import {ref} from 'vue'
	const formulario = ref({
	    repetitions:[
	        {
	            workout_id:router.currentRoute.value.query.id,
	            repetition_number:0,
	            level:1
	        }
	    ]
	})

	

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
		axios.post('/api/workouts/repetitions', formulario.value)
		.then(res=>{
			console.log(res)
		})
	}

</script>

<template>
	<div class="span-full">
		<form @submit.prevent="submit">
			<div v-for="(workout, index) in formulario.repetitions">
				<div>
					<label for="ejercicios">Ejercicio</label>
					<div class="micro-card">
						<select v-model="workout.workout_id" id="">
							<option v-for="workoutt in workouts" :value="workoutt.id">{{ workoutt.name }}</option>
						</select> 
					</div>
				</div>
				<div>
					<label for="level">Repeticiones</label>
					<input type="number" name="level" step="1" id="level" v-model="workout.repetition_number">
				</div>
				<div>
					<label for="level">Nivel</label>
					<input type="number" name="level" step="1" id="level" v-model="workout.level">
				</div>
				<b class="delete" @click="()=>formulario.repetitions.pop(index)">Eliminar</b>
			</div>
			<b @click="formulario.repetitions.push({})">+</b>
			<input type="submit" name="submit" id="submit">
		</form>
	</div>
</template>
<style scoped>
	.micro-card{
		display:flex;
		flex-direction: column;
	}
	.delete{
		border-radius: 8px;
		background-color: red;
		color: white;
		font-weight: 300;
		padding: 0.5em 1em;
		width: fit-content;
		text-align: center;
	}
</style>