/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'
import clienteAxios from '../config/axios'
import appContext from '../context/app/appContext'
import Spinner from './spinner/Spinner'





const Dropzone = () => {
const AppContext = useContext(appContext)

const {mostrarAlerta, subirArchivo, cargando, crearEnlace} = AppContext

const onDropRejected = ()=>{
    mostrarAlerta('ERROR, para subir archivos mayores de 1MB, inicia sesión')
}
const onDropAccepted = useCallback(async(acceptedFiles)=>{

      // Crear un form Data para poder subir archivos en lugar de json

    const formData = new FormData();
    formData.append('archivo',acceptedFiles[0]) // añadimos el archivo al objeto formData 
    
    subirArchivo(formData, acceptedFiles[0].path)   
  },[]);



    //Extraer contenido de Dropzone

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000})

    const archivos = acceptedFiles.map(file =>(
        <li className='bg-white flex-1 p-3 mb-4 shadow-lg rounded' key={file.path}>
             <p className='font-bold text-xl'>{file.path}</p>
             <p className='text-sm text-gray-500'>{(file.size/Math.pow(1024, 2)).toFixed(2)} MB</p>
        </li>
     
    ))  

   
    
  return (

   
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
               {acceptedFiles.length > 0 ? (
                <div className='mt-10 w-full flex flex-col items-center'>
                <h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>
                    
                    {cargando ? <Spinner /> :
                    <button  onClick={()=>crearEnlace()} className='bg-blue-700 w-4/5 py-3 rounded-lg text-white my-10 hover:bg-blue-800'> Crear Enlace</button>}
                </div>
                
               ):(
                <div {...getRootProps({ className:'dropzone w-full py-32'})}>
                
                 <input className='h-100 focus:outline-none border-none' {...getInputProps()}/>
              
             {isDragActive ? <p className='text-2xl text-center text-gray-600'> 
                     Suelta aquí el Archivo
              </p>: 
                 <div className='text-center'>
                     <p className='text-2xl text-center text-gray-600'> Arrastra un Archivo Aquí</p>
                     <button className='bg-blue-700 w-4/5 py-3 rounded-lg text-white my-10 hover:bg-blue-800' type='button'>Selecciona un Archivo</button>
                    
                 </div>
             }               
                 
             </div>
               )}
                
            
     </div>
  )
}

export default Dropzone