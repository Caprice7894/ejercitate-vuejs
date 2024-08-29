import {ref} from 'vue'

const userData = ref({
	name: null,
	token: null,
	profile_picture:"",
	created_at:"",
	updated_at:"",
	id: null
})

const authState = ref(false)

export {
	userData,
	authState
}