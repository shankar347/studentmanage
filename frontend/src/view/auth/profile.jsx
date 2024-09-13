import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    useToast,
  } from '@chakra-ui/react';
//   import { SmallCloseIcon } from '@chakra-ui/icons';
import { useRecoilState } from 'recoil';
import useratom from '../atom/useratom';
import { useEffect, useRef, useState } from 'react';
import changeimage from '../hooks/changeimage';
import { Link as router, Navigate, useNavigate } from 'react-router-dom';


  export default function UserProfileEdit() {
      
  const [userstate,setuserstate]=useRecoilState(useratom)
  const [actions,setactions]=useState({
    // name:userstate.name,
    email:userstate.email,
    username:userstate.username,
    password:'',
    bio:userstate.bio,   
  })

  const [updating,setupdating]=useState(false)
  
 const toast=useToast()

  const {handleimagchange,imgurl}=changeimage()  
  const navigate=useNavigate()
  const fileref=useRef(null)

  const handleupdatechange=async(e)=>{
    if(updating) return;
    setupdating(true)
    try
    {
      e.preventDefault();
      const res= await fetch(`/api/user/profile/${userstate._id}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({...actions,profilepic:imgurl})
      })
     const data= await res.json()
     console.log(data)
     if(data.error)
     {
      toast({
        description:data.error,
        title:'Error'
      })
      return;
     }
     
     var existtoken=JSON.parse(localStorage.getItem('token'))
     var token=JSON.stringify({
      token:data,
      expiresAt:existtoken?.expiresAt
     })
     setuserstate(JSON.parse(token))
     localStorage.setItem('token',token)
     toast({
      description:'Profile updated Successfully',
      title:'Error',
      duration:3000
     })
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setupdating(false)
      navigate(`/${userstate._id}`)
    }
  }
    return (
      <form onSubmit={handleupdatechange}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
       >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" 
                src={imgurl || userstate.profilepic} />
              </Center>
              <Center w="full">
                <Button w="full"
                onClick={()=>fileref.current.click()}
                >
                  Change Icon
                  </Button>
                <Input type='file' hidden ref={fileref}
                onChange={handleimagchange}/>
              </Center>
            </Stack>
          </FormControl>
          <FormControl >
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              border={'2px solid'}
              borderColor={'gray.300'}
             value={actions.username}
             onChange={(e)=>setactions({...actions,username:e.target.value})}
            />
          </FormControl>
          {/* <FormControl  >
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder='FullName'
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={actions.name}
              onChange={(e)=>setactions(
                {...actions ,name:e.target.value})}
            />
          </FormControl> */}
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              border={'2px solid'}
              borderColor={'gray.300'}
              value={actions.email}
              onChange={(e)=>setactions(
                {...actions ,email:e.target.value})}
            />
           <FormControl  >
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={actions.bio}
              border={'2px solid'}
              borderColor={'gray.300'}
              onChange={(e)=>setactions(
                {...actions ,bio:e.target.value})}
            />
          </FormControl>
          </FormControl>
          <FormControl id="password" >
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              value={actions.password}
              border={'2px solid'}
              borderColor={'gray.300'}
              onChange={(e)=>setactions(
                {...actions ,password:e.target.value})}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
            as={router}
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}
              to={'/'}
              >
              Cancel
            </Button>
            <Button
            type='submit'
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }} 
              isLoading={updating}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </form>
    );
  }