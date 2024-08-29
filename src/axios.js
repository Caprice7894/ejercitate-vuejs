import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
})

const csrf = () => axios.get('/sanctum/csrf-cookie')

export {csrf, axios}
