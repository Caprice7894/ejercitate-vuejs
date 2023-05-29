import { createRouter, createWebHistory } from 'vue-router'

const router = new createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes:[
		{path:'/',name:'home',component: ()=> import('../views/Home.vue')},
		{path:'/login',name:'login',component: ()=> import('../views/Login.vue')},
		{path:'/ejercicios',name:'ejercicios',component: ()=> import('../views/Ejercicios.vue')},
		{path:'/perseverancia',name:'perseverancia',component: ()=> import('../views/Perseverancia.vue')},
		{path:'/planes',name:'planes',component: ()=> import('../views/Planes.vue')},
		{path:'/preferencias',name:'preferencias',component: ()=> import('../views/Preferencias.vue')}
	]
})

export default router;