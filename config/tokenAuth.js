import clienteAxios from "./axios";

const tokenAuth = token =>{
    if (token){
         clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
         clienteAxios.delete.headers.common['Authorization']
    }
}

export default tokenAuth