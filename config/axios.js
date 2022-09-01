import axios from "axios";

const clienteAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKURL
})

export default clienteAxios