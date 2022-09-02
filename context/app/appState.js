
import React,{useReducer}from 'react'
import clienteAxios from '../../config/axios'
import { CREAR_ENLACE_EXITO, MOSTRAR_ALERTA,
         OCULTAR_ALERTA,
         SUBIR_ARCHIVO,
         SUBIR_ARCHIVO_ERROR,
         SUBIR_ARCHIVO_EXITO,
} from '../../types'
import appContext from './appContext'
import appReducer from './appReducer'


const AppState =({children})=>{

  const initialState = {
    mensaje_archivo: null,
    nombre: null,
    nombre_original:null,
    cargando:null,
    descargas: 1,
    password:'',
    autor:null,
    url:''
  }

  // crear state y dispatch

  const [state, dispatch] = useReducer(appReducer, initialState)

  // Muestra una alerta

const mostrarAlerta = msg =>{
  
  dispatch({
    type:MOSTRAR_ALERTA,
    payload: msg
  })

  setTimeout(() => {
    dispatch({
      type:OCULTAR_ALERTA,
    })
  }, 3000);
}
// sube los archivos al servidor

const subirArchivo = async (formData, nombreArchivo)=>{
dispatch({
  type: SUBIR_ARCHIVO
})
try {
  const resultado = await clienteAxios.post('/api/archivos', formData) // hacemos el post a nuestro servidor 
  dispatch({
    type: SUBIR_ARCHIVO_EXITO,
    payload: {
      nombre:resultado.data.archivo,
      nombre_original:nombreArchivo,
         },
      
  })
} catch (error) {
  console.log(error)
  dispatch({
    type: SUBIR_ARCHIVO_ERROR,
    payload: 'Hubo un Error'
    
  })
}};


// creando un enlace
const crearEnlace = async ()=>{
  const data = {
    nombre: state.nombre,
    nombre_original: state.nombre_original,
    descargas:state.descargas,
    password:state.password,
    autor:state.autor
  }

  try {
    const resultado = await clienteAxios.post('/api/enlaces',data)
    dispatch({
        type:CREAR_ENLACE_EXITO,
        payload:resultado.data.msg
    })
  } catch (error) {
    console.log(error)
  }
}                 
   
    
    return(
      <appContext.Provider
             value={{
              mensaje_archivo: state.mensaje_archivo,
              nombre:state.nombre,
              nombre_original:state.nombre_original,
              cargando:state.cargando,
              descargas:state.descargas,
              password:state.password,
              autor:state.autor,
              url:state.url,
              mostrarAlerta,
              subirArchivo,
              crearEnlace,
             }}
             >

        {children}
      </appContext.Provider>
    )
}

export default AppState