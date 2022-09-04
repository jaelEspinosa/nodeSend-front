import React, { useContext, useState } from 'react'
import appContext from '../context/app/appContext'



const Formulario = () => {
 const [tienePassword, setTienePassword]=useState(false)
 const AppContext = useContext(appContext)
 const {agregarPassword, setDescargas}=AppContext

  return (
    <div className='w-full mt-20 px-10 '>
      <div>
      <label className='text-lg text-gray-800'>Eliminar tras:</label>
      <select
             onChange={e=>setDescargas(parseInt(e.target.value))} 
             className='w-full appearance-none mt-2 bg-white border border-gray-400
                       text-black px-4 py-2 pr-8 rounded leading-none focus:outline-none
                        focus:border-gray-500 '>
        <option value=''  >--seleccione--</option>
        <option defaultValue='1'>1 descarga</option>
        <option value='5'>5 descargas</option>
        <option value='10'>10 descargas</option>
        <option value='20'>20 descargas</option>
      </select>
      </div>
      <div>
      <div className='flex flex-col'>
      <div className='flex justify-between items-center my-2'>
      <label className='text-lg text-gray-800 mr-2 font-bold'>Proteger con contraseña</label>
        <input onChange={()=>setTienePassword(!tienePassword)} type='checkbox'/>
      </div>
      
      {tienePassword &&  <input type='password'  
                                className='w-full appearance-none mt-2 bg-white border 
                                         border-gray-400 text-black px-4 py-2 pr-8 
                                           rounded leading-none focus:border-gray-500 '
                                onChange={e=>{agregarPassword(e.target.value)}}            
                                           />}
      </div>
      </div>
       

    </div>
  )
}

export default Formulario