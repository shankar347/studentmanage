import { Box, Center, CloseButton, Flex, Image, Input, Link, useColorMode } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import lightlogo from '../../assets/logo.png'
import darklogo from '../../assets/logodark.png'
import { useRecoilValue } from 'recoil';
import {AiFillHome} from 'react-icons/ai'
import {Link as router, useLocation, useNavigate, useParams} from 'react-router-dom'
import useratom from '../atom/useratom';
import {RxAvatar} from 'react-icons/rx'
import { BsFillChatQuoteFill } from 'react-icons/bs'
import { FaCog, FaCross, FaSearch, FaTimes } from 'react-icons/fa';
import { CgCross, CgSearch, CgTime } from 'react-icons/cg';
import { searchcontext } from './searchcontext';
const Header = () => {
    const user=useRecoilValue(useratom)
  
    const {colorMode,toggleColorMode}=useColorMode();
    const location=useLocation()
    const {id} =useParams();
    const isidpath=/^\/[a-zA-Z0-9]+$/.test(location.pathname)
    const {search,setsearch,searchusers,setsearchusers,
      inputvisible,setinputvisible,
      searchtext,setsearchtext
    } =useContext(searchcontext)
    const [allusers,setallusers]=useState(null)
    const {pathname}=useLocation() 
    const {setstory}=useContext(searchcontext)      

    useEffect(()=>{
    const handlegetallusers=async()=>{
      try
      {
       const res=await fetch('/api/user/allusers')
       const data=await res.json()
       setallusers(data)
      }
      catch(e)
      {
        console.log(e)
      }
    }
    handlegetallusers()
},[])

  const handleinputchange=(e)=>{
   setsearchtext(e.target.value)

   const filteredusers=allusers?.filter((user)=>
   user.username.toLowerCase().includes(e.target.value.toLowerCase()))
  
   setsearchusers(filteredusers)
  }

    return (
    <Flex mx={'0'}>
     {
      inputvisible ? (
      <Flex 
      mt="2rem"
      mb="3rem"
      mx='0'
       width="full"
      justifyContent={'center'}>
      <Flex width={{
        md:'50%',
        base:'100%',
        lg:'50%',
        sm:'100%'
      }}>
      <input onChange={handleinputchange}
      onClick={()=>setsearch(true)}
      value={searchtext}
      className='searchbar'/>
      <CloseButton bg={'gray.700'}
    onClick={()=>{
      setinputvisible(false)
      setsearch(false)
      setstory(true)
    }}
    fontSize={'12px'}
      fontWeight={'500'}
      borderLeftRadius={'0'}
        height={'35px'}/>
      </Flex>  
      </Flex>)
        : ( 
      
    <Flex width={'full'}
    justifyContent={`${!user ? 'center' :'space-between' }`} 
     alignItems={'center'} mt="2rem"
     mb="3rem">
      {
        user && (
          <Link  as={router} to={'/'}
          cursor={'pointer'} >
              <AiFillHome size={'28'}/>
          </Link>
        )
      }

   <Image alt='' width="2rem"  cursor={'pointer'} 
    src={colorMode === "dark" ? lightlogo : darklogo} 
   onClick={toggleColorMode}/>
   
   
   
   {
    user &&(
      <Flex alignItems={'center'} gap={'10px'}>
      { pathname === '/' &&
      <Box alignItems={'center'} alignSelf={'center'} 
       mr={'2px'} mt={'2px'} >
        <CgSearch size={'24'}    cursor={'pointer'}
        onClick={()=>{
          setinputvisible(true)
          setstory(false)
        }}/>
      </Box>
      }
       <Link as={router} to={`/chat`}>
        <BsFillChatQuoteFill size={'22'}/>
      </Link>
     
    



     { isidpath && 
     <Link as={router} to={`/${user._id}/settings`}>
     <FaCog size={'22'} />
     </Link>
     } 
     
      

      <Link as={router} to={`/${user?._id}`} 
      cursor={'pointer'}>
        <RxAvatar size={'26'}/>
      </Link>
     
     

      </Flex>
    )
   }
   </Flex>  
 )}
    </Flex>
  )
}

export default Header