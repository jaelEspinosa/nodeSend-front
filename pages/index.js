/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import Dropzone from "../components/Dropzone"
import appContext from "../context/app/appContext";
import Alerta from "../components/Alerta";



const index = () => {

// extraer el usuario autenticado del storage
const [mostrarMensaje, setMostrarMensaje] = useState(false)
const AuthContext = useContext(authContext)
const {usuarioAutenticado, usuario} = AuthContext

// extraer el mensaje de error de archivos

const AppContext = useContext(appContext);
const {mensaje_archivo,url} = AppContext  

useEffect(()=>{
  setMostrarMensaje(false)
  const token = localStorage.getItem('token')
  if (token){
    usuarioAutenticado()
  }
 
},[])


  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      {url ? (
        <>
        <p className="text-center text-2xl mt-10 ">
        <span className="font-bold text-red-700 text-3xl uppercase">Tu url es : </span>
         {`${process.env.NEXT_PUBLIC_FRONTURL}/enlaces/${url}`}</p>
         <button 
                 onClick={()=>navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTURL}/enlaces/${url}`)}
                 className="bg-red-400 hover:bg-gray-700  w-full p-2 text-white uppercase font-bold transition-colors mt-10"
                 type='button' >Copiar Enlace</button>
        </>
     
      ):(
        <>
        {mensaje_archivo && <Alerta />}
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone/>
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 className="text-4xl font-sans font-bold text1-gray-800 my-4 text-justify">
            Compartir archivos de forma sencilla y privada
            </h2>
            <p className="text-lg leading-loose text-justify"><span className="text-red-500 font-bold">ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo
            y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes privado y asegurarte de que tus cosas no permanezcan en línea 
            para siempre.</p>  
            {!usuario &&<Link href="/crearCuenta">
              <a onMouseEnter={()=>setMostrarMensaje(true)} onMouseOut={()=>setMostrarMensaje(false)} className="mt-5"><span className="text-red-500 font-bold">Crea una cuenta, y tendrás más ventajas.</span></a>
            </Link>}       
          </div>
       </div>
           {mostrarMensaje && <div className="text-center bg-white rounded-lg shadow-md mt-2 text-red-500">
            <p>* Estar registrado te dará la posibilidad de elegir un password para proteger tus archivos. </p>
            <p> Ademàs, podrás subir archivos mayores a 1GB</p>
           </div>}
        </>
      )}
      </div>
    </Layout>
  );
};

export default index;
