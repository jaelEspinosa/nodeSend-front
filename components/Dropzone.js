import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'




const Dropzone = () => {

const onDrop = useCallback((acceptedFiles)=>{
    console.log(acceptedFiles)
})

    //Extraer contenido de Dropzone

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({onDrop})
  return (

   
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
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
          </div>
  )
}

export default Dropzone