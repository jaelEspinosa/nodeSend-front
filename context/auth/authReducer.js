import { CERRAR_SESION, INICIARSESION_ERROR, INICIARSESION_EXITO, OCULTAR_ALERTA, REGISTRO_ERROR, REGISTRO_EXITOSO, USUARIO_AUTENTICADO } from "../../types";



// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) =>{
    switch(action.type){
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR:
        case INICIARSESION_ERROR:
            return{
            ...state,
            mensaje: action.payload,
            }
        case INICIARSESION_EXITO:
            localStorage.setItem('token', action.payload)
            return{
                ...state,
                token: action.payload,
                autenticado: true
            }    
        case OCULTAR_ALERTA:
            return{
                ...state,
                mensaje: null
            } 
        case USUARIO_AUTENTICADO:
            return{
                ...state,
                usuario: action.payload,
                autenticado:true
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                usuario: null,
                autenticado:null,
            }          
        default:
            return state;
    }
}