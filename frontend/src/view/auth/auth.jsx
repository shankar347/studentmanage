import React from 'react'
import { useRecoilValue } from 'recoil'
import authatom from '../atom/authatom'
import Login from './login'
import Register from './register'

const Auth = () => {
 
  
  const authstate=useRecoilValue(authatom)
//   console.log(authstate)
  return (
    <div>
        {
    authstate === "login" ? 
    <Login/> :
    <Register/>
   }
    </div>
  )
}

export default Auth