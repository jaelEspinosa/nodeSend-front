import Link from "next/link";
import React from "react";

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
