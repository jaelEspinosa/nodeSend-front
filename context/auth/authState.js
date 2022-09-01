import authContext from "./authContext";
import React,{ useReducer } from 'react'
import authReducer from "./authReducer";
import {CERRAR_SESION, INICIARSESION_ERROR, INICIARSESION_EXITO, LIMPIAR_ALERTA, REGISTRO_ERROR, REGISTRO_EXITOSO, USUARIO_AUTENTICADO} from '../../types'
import { useRouter } from "next/router";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";



const AuthState = ({children}) =>{
const router = useRouter()
  // definir un state inicial
  const initialState ={
    token :typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null
  }

  // Definir el reducer

  const [ state, dispatch] = useReducer(authReducer, initialState );
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
  //Autenticar usuarios
  const iniciarSesion =  async datos =>{
    try {
      const respuesta = await clienteAxios.post('/api/auth',datos)
      console.log(respuesta)
      dispatch({
        type: INICIARSESION_EXITO,
        payload: respuesta.data.token
      })
    } catch (error) {
      dispatch({
        type: INICIARSESION_ERROR,
        payload: error.response.data.msg
      })
      
    }
    setTimeout(() => {
      dispatch({
        type:LIMPIAR_ALERTA,
        
      })
    }, 3000);
  }
  
  // obtener el Usuario autenticado en bas al JWT
  const usuarioAutenticado = async ()=>{
    const token = localStorage.getItem('token')
      if(token){
        tokenAuth(token)
      }  
    try {
      const respuesta = await clienteAxios.get('api/auth')
      console.log(respuesta.data.usuario)
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.usuario
      })
    } catch (error) {
      dispatch({
        type: INICIARSESION_ERROR,
        payload: error.response.data.msg
      })
      setTimeout(() => {
        dispatch({
          type:LIMPIAR_ALERTA,
          
        })
      }, 3000);
      
    }
  }

  // cerrar la sesion

  const cerrarSesion = ()=>{
    dispatch({
      type: CERRAR_SESION
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
                     iniciarSesion,
                     usuarioAutenticado,
                     cerrarSesion
                 }}
         >

        {children}            
        </authContext.Provider>
    )

}

export default AuthState;