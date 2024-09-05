
import React, { createContext, useContext, useState } from 'react'



const postcontext=createContext()

export const usepostcontext=()=>useContext(postcontext)


const Poscontext = ({children}) => {
    const [post,setpost]=useState(null)
   
    const handlepost=(post)=>{
        setpost(post)
    }
  return (
      <postcontext.Provider value={{post,handlepost
      }}>
        {children}
      </postcontext.Provider>
    
  )
}

export default Poscontext