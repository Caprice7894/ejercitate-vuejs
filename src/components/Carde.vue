<script setup>
	const props = defineProps(['name', 'description'])
	const emits = defineEmits(['clk'])
</script>

<template>
	<div
		@click="emits('clk')"
		class="props"
		>
		<h1>{{ props.name }}</h1>
		<p>{{ props.description }}</p>
	</div>
</template>

<style scoped>
	.props{
		box-shadow: inset 0px -46px 8px rgba(0, 0, 0, 0.54);
		border-radius: 8px;
		color:black;
		width:100%;
		height:30vh;
		display:flex;
		flex-direction:column-reverse;
		text-align:right;
		padding:1em;
		box-sizing: border-box;
	}
	.props>h1{
		font-size: 1.5em;
		line-height:0;
		text-indent: 0px;;
	}
</style>