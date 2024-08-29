import {ref} from "vue"

const planes = ref({
	planes:[

		]
})

const plan ={
	"id": 0,
	"name": "",
	"description": "",
	"image_url": "",
	"created_at": "",
	"updated_at": "",
	"workouts": []
}
const workout = {
	"id": 0,
	"name": "",
	"description": "",
	"video_url": "",
	"is_time_based": 0,
	"created_at": "",
	"updated_at": "",
	"pivot": {
	    "plan_id": 0,
	    "workout_id": 0
	}
}

export {planes, plan, workout}