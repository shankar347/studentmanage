
import React, { useEffect } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icon'
import { useSetRecoilState } from 'recoil'
import authatom from '../atom/authatom'
import useratom from '../atom/useratom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  
   
  const [showPassword, setShowPassword] = useState(false)
  const [loading,setloading]=useState(false)
  const setauthstate=useSetRecoilState(authatom)
  const setuserstate=useSetRecoilState(useratom)
  const [actions,setactions]=useState({
    email:'',
    password:''
  })
  const toast=useToast()
  
  const navigate=useNavigate()


  const handlelogin=async(e)=>{
       e.preventDefault();
    try
    {
      setloading(true)
       const res=await fetch('/api/user/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(actions)
       })
      const data=await res.json()
      console.log(data.error)
      if(data.error)
      {
        toast({
          title:'Error',
          description:data.error,
          duration:3000
        })
       return;
      }

      var token=JSON.stringify({
        token:data,
        expiresAt:new Date().getTime() + 2* 24*60*60 * 1000
      })
      localStorage.setItem('token',token)
      setuserstate(JSON.parse(token))
      toast({
        description:"Logged in Successfully"
      })
      navigate('/')
    }
    catch(e)
    {
      console.log(e)
      // toast({
      //   status:'error',
      //   description:e.message,
      //   duration:3000
      // })
    }
    finally
    {
      setloading(false)
    }
  }



  return (
    <Flex
    align={'center'}
    justify={'center'}
    >
    <Stack spacing={8} mx={'auto'} maxW={'lg'} 
 
     py={12} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'} textAlign={'center'}>
        Login
        </Heading>
       
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.dark')}
        // boxShadow={'lg'}
        p={8}
        border={'1px solid'}
        borderColor={{
          md:'gray.light',
          lg:'gray.light',
          sm:'gray.light',
          base:'transparent '
        }}
        py={12} px={6}
        w={{
          base:'full',
          sm:'400px'
        }}>
        <Stack spacing={4}>
         
          <FormControl  isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" 
            placeholder='Enter you email'
            value={actions.email} 
            border={'2px solid'}
            borderColor={'gray.300'}
            onChange={(e)=>setactions({...actions,email:e.target.value})}/>
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} 
              value={actions.password}
              placeholder='Enter you password'
              border={'2px solid'}
              borderColor={'gray.300'}
              onChange={(e)=>setactions({...actions,password:e.target.value})}/>
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <FaEye width={'30px'}/> : <FaEyeSlash width={'30px '}/>}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={useColorModeValue('gray.600','gray.700')}
              color={'white'}
              _hover={{
                bg: useColorModeValue('gray.700','gray.800'),
              }}
              onClick={handlelogin}>
              {loading ? <Spinner/>  :  "Login"}

            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Dont have an account?
                  <Link color={'blue.400'}
                  onClick={()=>setauthstate('signup')}
                  ml={'8px'}
                  >
                    Sign Up
                  </Link>  
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default Login