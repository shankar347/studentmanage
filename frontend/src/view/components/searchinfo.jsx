import { Avatar, Flex, Text, useColorMode } from '@chakra-ui/react'
import React, { useContext } from 'react'
import {Link as router} from 'react-router-dom'
import { searchcontext } from './searchcontext'
const Searchinfo = ({user}) => {
   const {setsearch,
    setinputvisible,
    setsearchtext
   } =useContext(searchcontext)
  const {colorMode} =useColorMode()  
  return (
    <Flex  fontFamily={'sans-serif'}
   alignItems={'center'}  
    mx={'auto'}
   gap={{
    md:'15px',
    lg:'15px',
    base:'0px',
    sm:'0px'
   }}
   pl={'5px'}
   height={'80px'} width={{
    md:'50%',
    base:'80%',
    lg:'',
    sm:'100%'}}
    borderRadius={'5px'}
    
    border={'1px solid transparent'}
    _hover={{
        border:'1px solid',
        borderColor:colorMode=== "dark" ? 'gray.dark' :'gray.400'
    }}
  >
     <Avatar src={user?.profilepic} 
     name={user?.username} width={{
       md: '40px',
       lg:'40px',
       base:'30px'}} height={{
        md:'40px',
        base:'30px'}}/>   
      <Flex flexDirection={'column'}
      ml={{md:'0',
        lg:'0',
        base:'10px',
        sm:'10px'
      }} width={'130px'}>
       <Text fontSize={{
        md:'19px',
        lg:'19px',
        sm:'17px',
        base:'17px'
       }}>
        {user?.username}
        </Text>
       <Text  
       fontSize={{
        md:'18px',
        lg:'18px',
        sm:'16px',
        base:'16px'
       }} color={'gray.light'}>
        {user?.name}
        </Text> 
     </Flex>
     <Text width={'90px'} 
     display={{
        md:'block',
        lg:'block',
        base:'none',
        sm:'none'
     }}>
        {user?.followers?.length} followers
     </Text>    
     <Text borderRadius={'5px'} 
   //   background={'gray.800'}
   bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
   color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}
     py={'8px'} 
     px={'8px'} alignSelf={'center'}
     justifySelf={'center'}
     fontSize={'15px'}
     _hover={{background:'gray.600'}}
     cursor={'pointer'} 
     onClick={()=>{
        setinputvisible(false)
        setsearch(false)
        setsearchtext('')
    }}
     ml={{
        md:'10px',
        lg:'10px',
        base:'0px'}} as={router} to={`/${user?._id}`}>
        View profile
     </Text>  
    </Flex>
  )
}

export default Searchinfo