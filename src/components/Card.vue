<script setup>
	const plan = defineProps(['name', 'description', 'image_url'])
	const emits = defineEmits(['clk'])
</script>

<template>
	<div
		@click="emits('clk')"
		:style="{backgroundImage:`url(${plan.image_url})`}"
		class="plan"
		>
		<h1>{{ plan.name }}</h1>
		<p>{{ plan.description }}</p>
	</div>
</template>

<style>
	.plan{
		box-shadow: inset 0px -46px 8px rgba(0, 0, 0, 0.54);
		border-radius: 8px;
		color:white;
		width:100%;
		height:30vh;
		display:flex;
		flex-direction:column-reverse;
		text-align:right;
		padding:1em;
		box-sizing: border-box;
	}
	.plan>h1{
		font-size: 1.5em;
		line-height:0;
		text-indent: 0px;;
	}
</style>