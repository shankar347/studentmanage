import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { useRecoilValue } from "recoil";
import io from 'socket.io-client'
import useratom from "../atom/useratom";

const socketcontext=createContext()


export const usesocket=()=>{
    return useContext(socketcontext)
}


export const Socketcontextprovider = ({children}) => {

    
    const [socket,setSocket]=useState(null)
    const [onlineusers,setonlineusers]=useState(null)
    const user=useRecoilValue(useratom)
    
    useEffect(()=>{
      const socket=io('/',{
        query:{
            userId:user?._id
        }
      })
      

      
      setSocket(socket)
     
      socket.on('getOnlineUsers',(users)=>{
       setonlineusers(users)   
      })

      return () => socket && socket.close()
           
    },[user?._id])
   
    
  return <socketcontext.Provider value={{socket,onlineusers}}>{children}</socketcontext.Provider>

}



