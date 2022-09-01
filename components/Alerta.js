import React,{useContext} from 'react'
import authContext from '../context/auth/AuthContext'

const Alerta = () => {
  const AuthContext = useContext(authContext)
  const{mensaje} = AuthContext
    return (
        <>
     <div 
           className='bg-red-400 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto  '
    >{mensaje}</div>

        </>
  )
}

export default Alerta