/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";
import Dropzone from "../components/Dropzone"



const index = () => {

// extraer el usuario autenticado del storage

const AuthContext = useContext(authContext)
const {usuarioAutenticado, usuario} = AuthContext
useEffect(()=>{
  const token = localStorage.getItem('token')
  if (token){
    usuarioAutenticado()
  }
 
},[])
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
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
              <a className="mt-5"><span className="text-red-500 font-bold">Crea una cuenta, y tendrás más ventajas.</span></a>
            </Link>}       
          </div>
       </div>
      </div>
    </Layout>
  );
};

export default index;
