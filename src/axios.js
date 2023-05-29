import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://test.localhost',
    withCredentials: true,
})

const csrf = () => axios.get('/sanctum/csrf-cookie')

export {csrf, axios}