import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const getUserInfo=()=>{

    const [user,setuser]=useState()
    const [loading,setloading]=useState(false)
    const {id}=useParams()
    const toast=useToast()
    useEffect(()=>{
         const handleuser=async()=>{
            setloading(true)
            try
            {
          const res= await fetch(`/api/user/profile/${id}`)
          const data=await res.json()
          if(data.error)
            {
              toast({
                 description:"User not found",
                 title:'Error' , 
              })
              return;         
            }
          setuser(data)   
            }
            catch(e)
            {
                console.log(e)
            } 
            finally
            {
                setloading(false)
            }
         }
         handleuser();
    },[id])
    
    return {user,loading}
}
export default getUserInfo;