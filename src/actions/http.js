import axios from 'axios'

const http = axios.create({
    baseURl: "http://localhost:8003/",
})

export default http;