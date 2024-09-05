import { Avatar, Box,
    Button,
    Flex, Link, 
    Menu, MenuButton, MenuItem,
     MenuList, Portal, Text,
      VStack, useColorMode, useToast } 
      from '@chakra-ui/react'
 import React, { useContext, useEffect, useState } from 'react'
 import {BsInstagram } from 'react-icons/bs'
 import {CgMoreO} from 'react-icons/cg'
 import {Link as router} from 'react-router-dom'
 import useratom from '../atom/useratom';
 import { useRecoilValue } from 'recoil';
 import { searchcontext } from '../components/searchcontext'
 const Userheader = ({data}) => {
 
   const toast=useToast()
 
   const user=useRecoilValue(useratom)
   const {profilepage,setprofilepage} =useContext(searchcontext)
   const [following,setfollowing]=useState(
     data?.followers?.includes(data._id))
 
   const [updating,setupdating]=useState(false)
   const [loading,setloading]=useState(true)
   const {colorMode,toggleColorMode}=useColorMode();
   
   const copyurl=()=>{
    
     const currenturl=window.location.href;
 
     navigator.clipboard.writeText(currenturl).then(()=>{
     toast({
       status:"success",
       title:"Link Copied",
       description:"Profile link copied to clipboard",
       duration:3000,
       isClosable:true
     })
     })
   }
    
   useEffect(()=>{
      if(data?.followers?.includes(user._id))
      {
       setfollowing(true)
      }
      else
      {
       setfollowing(false)
      }
 
   },[data])
   
   const handlefollow=async(e)=>{
     e.preventDefault();
 
     if(updating) return ;
     setupdating(true)
      try{
        const res=await fetch(`/api/user/follow/${data._id}`,
       {
         method:'POST',
         headers:{
           'Content-Type':'application/json'
         },
       })
       const data2=await res.json()
       if(data2.error)
       {
         toast({
           description:data2.error,
           title:'Error'
         })
         return 
       }
       if(!following)
       {
         data.followers.push(user._id)
         toast({
           description:`Followed ${data.username}`,
           title:'Sucess'
         })
       }
       else
       {
         data.followers.pop()
         toast({
           description:`Unfollowed ${data.username}`,
           title:'Sucess'
         })
       }
       setfollowing(!following)
      }
      catch(err)
      {
       console.log(err)
      }
      finally
      {
       setupdating(false)
      }
   }
 
   return (
     <VStack gap={4} alignItems={"start"} fontFamily={"sans-serif"}>
         <Flex justifyContent={'space-between'}  w={"full"}>
           <Box>
            <Text fontSize={"2xl"}>
              {data?.username}
            </Text>
            <Flex gap={3} alignItems={"center"}>
             <Text fontSize={"md"}>
                #{data?.username}   
             </Text>
             <Text bg={colorMode ==='light'? "gray.light" : 'gra.dark'} borderRadius={'50px'} 
             padding={'6px'} paddingX={'13px'} fontSize={"sm"} color={
              colorMode ==='light'? "gray.dark" : 'gray.light'}>
                 collabvia.net
             </Text>
            </Flex>
           </Box>
           <Box>
             <Avatar border={'1px solid gray'}   
              name={data?.username} src={data?._id === user._id ? 
               user?.profilepic :  data?.profilepic}
               size={{
               base:"md",
               md:"xl"
             }} 
             loading='lazy' />
           </Box>
         </Flex>
           <Text mb={'-9px'} fontSize={"md"}>
           {data?.bio}
             </Text>  
         <Flex w={"full"} justifyContent={"space-between"}>
         <Flex alignItems={'center'} color={'gray.light'} gap={5}>
         <Text fontSize={"md"}>
             {data?.followers?.length} followers
        </Text> 
           <Link> 
             socialapp.com
           </Link>
         </Flex>
       <Flex alignItems={"center"}>
         {/* <Box  className='icon-container' alignItems={"center"}>
         <BsInstagram size={24} cursor={"pointer"}/>
         </Box> */}
         <Box  className='icon-container'>
           <Menu 
            bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
            color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}
            >
             <MenuButton  
             >
             <CgMoreO  size={24} />
             </MenuButton>
           <Portal>
           <MenuList
          //  hover={{
          //   bg:colorMode=== "dark" ? 'gray.dark' :'gray.700'
          //  }}
           minWidth={'8rem'} 
           bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
           color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}>
                 <MenuItem onClick={copyurl}
                 _hover={{
                  bg:colorMode=== "dark" ? 'gray.dark' :'gray.500'
                 }}
                 bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
                  color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}
                  >Copy link</MenuItem>
               </MenuList> 
           </Portal>
           </Menu>
         </Box>
       </Flex>
         </Flex>
         {
          user?._id === data?._id && 
          <Link as={router} to={'/profile'}
          href='/profile'>
         <Button fontSize={'sm'}
         bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
         color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}
         >
           Update profile
         </Button>
         </Link>
         }
         {
           user?._id !== data?._id && (
             <Button fontSize={'sm'} onClick={handlefollow} 
             isLoading={updating} 
             bg={colorMode=== "dark" ? 'gray.dark' :'gray.400'}
             color={colorMode === "dark" ? 'grary.light' : 'gray.dark'}>
                {following ? "Unfollow" : "Follow"}
             </Button>
           )
         }
         
        
       <Flex w={"full"}>
         <Flex flex={"1"} justifyContent={"center"} pb={"1"} 
           borderColor={profilepage === 'posts' ? 
           colorMode ==='light'? "gray.dark" : 'gray.light'  :'gray.100'}
         borderBottom={"1.5px  solid "} 
          color={profilepage ==='posts' ?  colorMode ==='light'? "gray.dark" : 'gray.300' : 'gray'} 
         onClick={()=>setprofilepage('posts')} cursor={"pointer"} > 
         <Text fontWeight={"bold"}>Posts</Text>
         </Flex>
         <Flex flex={"1"} borderBottom={"1.5px solid"}
          borderColor={profilepage === 'followers' ?  colorMode ==='light'? "gray.dark" : 'gray.300' :'gray'}
           justifyContent={"center"} pb={"1"} 
           onClick={()=>setprofilepage('followers')}
            cursor={"pointer"}
            color={profilepage ==='followers' ? colorMode ==='light'? "gray.dark" : 'gray.light' : 'gray'}  >
           <Text fontWeight={"bold"} >
             Followers
           </Text>
         </Flex>
       </Flex>
     </VStack>
   )
 }
 
 export default Userheader