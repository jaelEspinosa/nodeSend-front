/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import authContext from "../context/auth/authContext";

const Header = () => {
  
  const AuthContext = useContext(authContext);
  const { usuario, cerrarSesion } = AuthContext;
  
 
  
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <img
            className="w-64 mb-8 md:mb-0 "
            src="logo.svg"
            alt="imagen_logo"
          />
        </a>
      </Link>

      <div>
      {usuario ? (
        <>
        <div className="inline-block">
          <a className=" mx-5 font-bold uppercase">
            <span className="text-red-400 ">Bienvenido:{'  '}</span>{usuario.nombre}
          </a>
        </div>
        <div  className="inline-block">
          <button 
             onClick={()=>cerrarSesion()}
            className="bg-black mr-2 px-5 py-3 rounded-lg text-white font-bold uppercase md:mt-0 md:ml-0 ml-5 mt-5">
            Cerrar Sesión
          </button>
        </div>
        </>
        
      ) : (
        <>
        <Link href="/login">
          <a className="bg-red-400 mr-2 px-5 py-3 rounded-lg text-white font-bold uppercase">
            Iniciar Sesión
          </a>
        </Link>
        <Link href="/crearCuenta">
          <a className="bg-black mr-2 px-5 py-3 rounded-lg text-white font-bold uppercase">
            Crear Cuenta
          </a>
        </Link>
        </>
      )
      }
        
      </div>
    </header>
  );
};

export default Header;
