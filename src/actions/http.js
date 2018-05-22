import axios from 'axios'

const client = axios.create({
    baseURl: "http://localhost:8003/",
})

export default client;