/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react'
import Alerta from '../../components/Alerta';
import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'
import appContext from '../../context/app/appContext';
import authContext from "../../context/auth/authContext";


export async function getServerSideProps({params}) {

  const resultado = await clienteAxios.get(`/api/enlaces/${params.enlace}`)
  
  return {
    props:{
      enlace:resultado.data
    }
  }
}

export async function getServerSidePaths() {

  const enlaces = await clienteAxios.get('/api/enlaces')
  
  return {
    paths:enlaces.data.enlaces.map(enlace =>({
      params:{ enlace : enlace.url}
    })),
    fallback:false
  }

}




const enlace = ({enlace}) => {
  const AuthContext = useContext(authContext)
  const {usuarioAutenticado, usuario} = AuthContext
  const [tienePassword, setTienePassword] = useState(enlace.password)
  const [password, setPassword] = useState('')
  const [archivoDestino, setArchivoDestino] = useState('')
 
  // state de appcontext
  const AppContext = useContext(appContext)
  const {mostrarAlerta, mensaje_archivo} = AppContext
 
  useEffect(()=>{
    const token = localStorage.getItem('token')
    setArchivoDestino(enlace.archivo)
    if (token){
      usuarioAutenticado()
    }
   
  },[])

  const verificarPassword = async e =>{
    e.preventDefault()

    const data={
      password
    }
    try {
       const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data)
       setTienePassword(resultado.data.password)
       setArchivoDestino(resultado.data.archivo)
      } catch (error) {
      mostrarAlerta(error.response.data.msg)
      }

    
  }
  return (
    <Layout>
    {tienePassword ? (
          <>
          <h2 className='text-center text-xl bg-gray-200 shadow'>Archivo Protegido, introduce el password</h2>
          {mensaje_archivo && <Alerta />}
          <div className='w-full max-w-lg mx-auto mt-10'>
          
            <form
                 onSubmit={e => verificarPassword(e)} 
                 className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 '>
            <label 
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2">Password</label>
                 <input
                    placeholder='Password del enlace'
                    id="password" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-blue-800 "
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}  
                    /> 
                  <input 
                 className="bg-red-400 hover:bg-gray-700 mt-10  w-full p-2 text-white uppercase font-bold transition-colors"
                 type='submit' value='Validar'/>
            </form>
          </div>
          

          </>
      ):(<>
        <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo:</h1>
        <div className='flex items-center justify-center mt-10'>
              <a  href = {`${process.env.NEXT_PUBLIC_BACKURL}/api/archivos/${archivoDestino}`} 
                className='bg-red-400 text-center px-10 py-3 rounded uppercase text-white font-bold hover:cursor-pointer '>Aquí</a>             
        </div>
      </>)}
   
    
    </Layout>
  )
}

export default enlace