import authContext from "./AuthContext";
import React,{ useReducer } from 'react'
import AuthReducer from "./AuthReducer";
import {LIMPIAR_ALERTA, REGISTRO_ERROR, REGISTRO_EXITOSO} from '../../types'
import clienteAxios from "../../config/axios";
import { useRouter } from "next/router";




const AuthState = ({children}) =>{
const router = useRouter()
  // definir un state inicial
  const initialState ={
    token :'',
    autenticado: null,
    usuario: null,
    mensaje: null
  }

  // Definir el reducer

  const [ state, dispatch] = useReducer(AuthReducer, initialState );
  // registrar usuario

  const registrarUsuario = async datos =>{
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      
      dispatch({
        type:REGISTRO_EXITOSO,
        payload:respuesta.data.msg
      })
      setTimeout(() => {
        router.push('/')
      }, 2900);
    
    } catch (error) {
     dispatch({
        type:REGISTRO_ERROR,
        payload:error.response.data.msg
      })
    
    }
    setTimeout(() => {
      dispatch({
        type:LIMPIAR_ALERTA,
        
      })
    }, 3000); 
  }



  // usuario autenticado

  const usuarioAutenticado = nombre =>{
       dispatch({
        type: USUARIO_AUTENTICADO,
        payload: nombre
       })
  }

    return (
        <authContext.Provider
                 value={{ 
                     token: state.token,
                     autenticado: state.autenticado,
                     usuario: state.usuario,
                     mensaje: state.mensaje,
                     registrarUsuario,
                     usuarioAutenticado
                 }}
         >

        {children}            
        </authContext.Provider>
    )

}

export default AuthState;