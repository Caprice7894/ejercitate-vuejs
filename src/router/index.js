import { createRouter, createWebHistory } from 'vue-router'

const router = new createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes:[
		{path:'/',name:'home',component: ()=> import('../views/Home.vue')},
		{path:'/login',name:'login',component: ()=> import('../views/Login.vue')},
		{path:'/register',name:'register',component: ()=> import('../views/Register.vue')},
		
		{path:'/ejercicios',name:'ejercicios',component: ()=> import('../views/Ejercicios.vue')},
		{path:'/ejercicios/new',name:'ejercicioForm',component: ()=> import('../views/forms/Workouts/Workout.vue')},
		{path:'/ejercicios/populateRepetitions',name:'populateRepetitionsEjercicioForm',component: ()=> import('../views/forms/Workouts/PopulateRepetitions.vue')},
		
		{path:'/perseverancia',name:'perseverancia',component: ()=> import('../views/Perseverancia.vue')},
		
		{path:'/planes',name:'planes',component: ()=> import('../views/Planes.vue')},
		{path:'/planes/new',name:'planForm',component: ()=> import('../views/forms/Plans/Plan.vue')},
		{path:'/planes/populate/:id',name:'populatePlan',component: ()=> import('../views/forms/Plans/PopulatePlan.vue')},
		
		{path:'/preferencias',name:'preferencias',component: ()=> import('../views/Preferencias.vue')}
	]
})

export default router;
