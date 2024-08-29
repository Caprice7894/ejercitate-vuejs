<script setup>
	import {axios} from "../axios.js"
	import {ref, reactive} from 'vue'
	import {RouterLink} from 'vue-router'
	import {planes, plan, workout} from "../storage/planes.js"
	import Card from '../components/Card.vue'

	const memo_planes = {}
	const show_planes = ref([])
	const workouts = ref([])
	const cursor_workouts = ref({});
	const selected = ref(false)
	let plan_id
	let elapsed_minutes
	let nextIndex = 1

	const fetch_planes_with_memo = async (url)=>{
		if(memo_planes[url] !== undefined){
			show_planes.value = prepare_data(JSON.parse(memo_planes[url]))
			return
		}
		const {data} = await axios.get(url);
		memo_planes[url] = JSON.stringify(data);
		
		prepare_data(data).forEach(item=>show_planes.value.push(item))
		return
	}

	const prepare_data = (data)=>{
		const res = data.data.map(item=>{
			item.workouts = item.workouts.map(wk=>{
				const level = wk.pivot.level;
				for(const index in wk.repetitions)
					if(wk.repetitions[index].level === level)
						wk.repetitions.pop(index)
				return wk;
			})
			return item;
		})
		console.log(res)
		return res
	}
	const select=(workout_item, index)=>{
		if(workout_item == null){
			const diffMs = (new Date()) - elapsed_minutes
			const time_min = Math.round(((diffMs % 86400000) % 3600000) / 60000);
			axios.post('/api/perseverances',{plan_id, elapsed_time: time_min})
			return
		}
		cursor_workouts.value = workout_item
		selected.value=true
		nextIndex = index + 1
	}

	function next(){
		select(workouts.value[nextIndex],nextIndex)
	}

	if(planes.value.planes.length === 0){
		fetch_planes_with_memo('/api/plans');	
	}

	function select_plan(variable){
		workouts.value = variable.workouts
		plan_id = variable.id
		elapsed_minutes = new Date()
	}
</script>
<template>
	<div class="span-start">
		<Card v-for="plan in show_planes"
			@clk="select_plan(plan)"
			:name="plan.name"
			:description="plan.description"
			:image_url="plan.image_url"
			/>
		<RouterLink class="button round" to="/planes/new">+</RouterLink>
	</div> 
	<div class="span-mid">
		<div @click="()=>select(wo, index)" v-for="wo,index in workouts" style="margin:1em;">
			{{ wo.name }}
			<b v-if="wo.is_time_based == 1">{{ wo.repetitions[0].repetition_number ?? "" }}s</b>
			<b v-else >{{ wo.repetitions[0].repetition_number ?? "" }}</b>
		</div>
	</div>
	<div class="span-end" v-if="selected">
		<iframe :src="cursor_workouts.video_url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
		<h3>{{ cursor_workouts.name }}</h3>
		<div>
			{{ cursor_workouts.description }}
		</div>
		<div>
			<button @click="next()">Prev</button>
			<button @click="next()">||</button>
			<button @click="next()">Next</button>
			<b v-if="cursor_workouts.is_time_based == 1">{{ cursor_workouts.repetitions[0].repetition_number ?? "1111" }}s</b>
			<b v-else >{{ cursor_workouts.repetitions[0].repetition_number ?? "1111" }}</b>
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
	.span-end iframe{
		border-radius: 1em;
	}
</style>