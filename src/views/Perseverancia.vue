<template>
	<div class="span-start">
		<b v-for="date in dates" style="background: lightgray; display: block; margin: 1em; padding: 1em;">
			Tiempo transcurrido: {{ date.elapsed_time}}<br>	
			Fecha: {{  new Date(date.created_at) }}<br>	
			Plan: {{ date.plan_id }}
		</b>
	</div>
</template>

<script setup>
	import {axios} from '../axios.js'
	import {ref} from 'vue'

	const dates = ref([])
	const memo = {}
	const fetch_dates_with_memo = async (url) =>{
		if(memo[url] !== undefined){
			dates.value = prepare_data(JSON.parse(memo[url]))
			return
		}
		const {data} = await axios.get(url);
		memo[url] = JSON.stringify(data);

		data.forEach(item=>dates.value.push(item))
		return
	}
	fetch_dates_with_memo('/api/perseverances')
</script>