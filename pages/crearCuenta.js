import { useFormik } from "formik";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import * as Yup from 'yup'
import authContext from "../context/auth/AuthContext";
import Alerta from "../components/Alerta";


const crearCuenta = () => {
    // acceder al state

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const AuthContext = useContext(authContext)
    const {registrarUsuario, mensaje} = AuthContext;
    
    // Formulario y validacion con formik y yup

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
      initialValues: {
        nombre:'',
        email:'',
        password:''
      },
      validationSchema:Yup.object({
        nombre: Yup.string()
                  .required('El nombre es obligatorio'),
        email: Yup.string()
                  .email('El email no es válido')
                  .required('El email es obligatorio'),
        password: Yup.string()
                  .required('El password no puede ir vacio')
                  .min(6, 'El password debe tener al menos 6 caracteres')
                  
                                      
      }),
      onSubmit: (val)=>{
        registrarUsuario(val)
      }
    });
  
  
    return (

    <Layout>
      <div className="md:w-4/5 xl:w:3/5 mx-auto mb-2 ">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Crear Cuenta
        </h2>
        {mensaje && <Alerta/>}
        <div className="flex justify-center mt-5">
       
          <div className="w-full max-w-lg">

            <form
              onSubmit={formik.handleSubmit}
              className="bg-white rounded-lg shadow-md px-8 pb-8 mb-4 py-5"
            >
             <div className="mb-4">
                <label 
                  htmlFor="nombre"
                  className="block text-black text-sm font-bold mb-2">Nombre</label>
                 <input 
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="nombre"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-blue-800 "
                    type='text'/> 
               {formik.touched.nombre && formik.errors.nombre && (
                 <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.nombre}</p>
                 </div>
               )}
             </div>
             <div className="mb-4">
                <label 
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2">Email</label>
                 <input 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-blue-800 "
                    type='text'/> 

               {formik.touched.email && formik.errors.email && (
                 <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                 </div>
                )}                
                    
             </div>
             <div className="mb-4">
                <label 
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2">Password</label>
                 <input
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="password" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-blue-800 "
                    type='password'/> 

                  {formik.touched.password && formik.errors.password && (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{formik.errors.password}</p>
                  </div>
                  )} 
             </div>
             <input 
                 className="bg-red-400 hover:bg-gray-700  w-full p-2 text-white uppercase font-bold transition-colors"
                 type='submit' value='Crear Cuenta'/>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default crearCuenta;
