import { Button, Flex, useToast } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import useratom from '../atom/useratom'
import {FiLogOut} from 'react-icons/fi'
const Logout = () => {

    const setuser=useSetRecoilState(useratom)
    const toast=useToast()


  const handlelogout=async(e)=>{

    e.preventDefault();
    try
    {
      const res=await fetch('/api/user/logout')
      const data= await res.json();
      console.log(data)
      if(data.error)
      {
        toast({
            description:data.error,
            title:'Error',
            duration:3000
        })
      }   
      localStorage.removeItem('token')
      setuser(null)
    }
    catch(e)
    {
        console.log(e)
    }
  }


  return (
    <Flex>  
    <Button display={{
      md:'none',
      lg:'block',
      base:'none',
      sm:'none'
    }} position={'fixed'} right={'30px'}
    top={'30px'} size={"sm"} 
    onClick={handlelogout}>
   <FiLogOut size={'20'}/>
    </Button>
    </Flex>
  )
}

export default Logout