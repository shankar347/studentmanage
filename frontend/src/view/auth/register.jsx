import React, { act } from 'react'
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
  Select,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authatom from '../atom/authatom'
import useratom from '../atom/useratom'
import { FaAngleDown, FaArrowCircleDown, FaArrowDown, FaEye, FaEyeSlash, FaMarkdown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import avit from '../../assets/avit.jpg'
import sas from '../../assets/sas.jpeg'
import kireng from '../../assets/vmrf.jpeg'
import vmrflaw from '../../assets/vmlawa.jpeg'
import vinaykmedical from '../../assets/karikalclglogo.jpeg'
import vmrfsdentallgo from '../../assets/vmrfsankardentallogo.jpeg'
import vmrflogo from '../../assets/vmrflogo.jpeg'
import kirubdental from '../../assets/vmrfkirubantamedicallogo.jpeg'
import kirubarts from '../../assets/vmrfkirubantaartslogo.jpeg'
import fahs from '../../assets/vmrffahslogo.jpeg'
import vmrfpharma from '../../assets/vmrfcollegepharmacy.jpeg'


const Register=()=> {
  
  const [showPassword, setShowPassword] = useState(false)
 
  const [actions,setactions]=useState({
    college:'',
    department:'',
    isfa:false,
    username:'',
    email:'',
    password:''
  })

  const [loading,setloading]=useState(false)
  const setatomstate=useSetRecoilState(authatom)
  const setuserstate=useSetRecoilState(useratom)
  const toast=useToast()
 const navigate=useNavigate()
 
 console.log(actions.department === "")
 
 const artsdep=[
  "B.Com. (General)",
  "B.Com. (Banking and Finance)",
  "BBA (General)",
  "BBA (Computer Application)",
  "B.Sc. (Computer Science)",
  "B.Sc. (Chemistry)",
  "M.Sc. (Computer Science)",
  "M.Sc. (Chemistry)",
  "M.Com. (General)"
]


 const engdep=[
  "B.E. Civil Engineering",
  "B.E. Mechanical Engineering",
  "B.E. Computer Science and Engineering",
  "B.E. Computer Science and Engineering (CS)",
  "B.E. Computer Science and Engineering (AI & ML)",
  "B.E. Computer Science and Engineering (AI & DS)",
  "B.E. Electrical and Electronics Engineering",
  "B.E. Electronics and Communication Engineering",
  "B.E. Biomedical Engineering",
  "B.Tech. Information Technology",
  "B.Tech. Biotechnology",
  "B.Arch. (Bachelor of Architecture)",
  "B.Tech. Artificial Intelligence and Data Science",
  "M.E. Structural Engineering",
  "M.E. Computer Science and Engineering",
  "M.E. Communication Systems",
  "M.E. Power Systems",
  "M.Tech. Biotechnology",
  "M.Arch. (Master of Architecture)",
  "Ph.D. in Engineering"
]

 
 const lawdep=[
  "BBA LLB (Hons)",
  "BA LLB (Hons)",
  "B.Com LLB (Hons)",
  "LLB (Hons)"
]


const sasdep=[
  "B.A. English",
  "B.Sc. Mathematics",
  "B.Sc. Physics",
  "B.Sc. Chemistry",
  "B.Sc. Computer Science",
  "B.Sc. Biotechnology",
  "B.Sc. Microbiology",
  "B.Com. General",
  "B.Com. Computer Applications",
  "BBA (Bachelor of Business Administration)",
  "M.Sc. Mathematics",
  "M.Sc. Physics",
  "M.Sc. Chemistry",
  "M.Sc. Computer Science",
  "M.Sc. Biotechnology",
  "M.Sc. Microbiology",
  "M.A. English",
  "M.Com. General",
  "M.Phil. Mathematics",
  "M.Phil. Physics",
  "M.Phil. Chemistry",
  "M.Phil. Computer Science",
  "M.Phil. English",
  "Ph.D. Mathematics",
  "Ph.D. Physics",
  "Ph.D. Chemistry",
  "Ph.D. Computer Science",
  "Ph.D. Biotechnology",
  "Ph.D. Microbiology",
  "Ph.D. English",
  "Ph.D. Commerce"
]

 

 const alliedhealthsciencdep=[
  "B.Sc. Medical Laboratory Technology",
  "B.Sc. Radiology & Imaging Technology",
  "B.Sc. Cardiac Technology",
  "B.Sc. Renal Dialysis Technology",
  "B.Sc. Anesthesia Technology",
  "B.Sc. Optometry",
  "B.Sc. Operation Theatre Technology",
  "B.Sc. Physician Assistant",
  "B.Sc. Respiratory Therapy",
  "B.Sc. Neurophysiology Technology",
  "B.Sc. Emergency & Trauma Care Technology",
  "M.Sc. Medical Laboratory Technology",
  "M.Sc. Radiology & Imaging Technology",
  "M.Sc. Cardiac Technology",
  "M.Sc. Renal Dialysis Technology",
  "M.Sc. Anesthesia Technology",
  "M.Sc. Optometry",
  "M.Sc. Operation Theatre Technology",
  "M.Sc. Physician Assistant",
  "M.Sc. Respiratory Therapy",
  "Diploma in Medical Laboratory Technology",
  "Diploma in Radiology & Imaging Technology",
  "Diploma in Cardiac Technology",
  "Diploma in Renal Dialysis Technology",
  "Diploma in Anesthesia Technology",
  "Diploma in Optometry",
  "Diploma in Operation Theatre Technology"
]


 const medicaldep=[
  "General Medicine",
  "General Surgery",
  "Obstetrics & Gynecology",
  "Pediatrics",
  "Orthopedics",
  "Ophthalmology",
  "ENT (Ear, Nose, and Throat)",
  "Dermatology, Venereology & Leprosy",
  "Anesthesiology",
  "Radiology",
  "Psychiatry",
  "Emergency Medicine",
  "Community Medicine",
  "Forensic Medicine",
  "Pharmacology",
  "Pathology",
  "Microbiology",
  "Biochemistry",
  "Physiology",
  "Anatomy"
]


 const dentaldep=[
  "BDS (Bachelor of Dental Surgery)",
  "MDS (Master of Dental Surgery) in Oral and Maxillofacial Surgery",
  "MDS in Prosthodontics and Crown & Bridge",
  "MDS in Conservative Dentistry and Endodontics",
  "MDS in Orthodontics and Dentofacial Orthopedics",
  "MDS in Periodontology",
  "MDS in Oral Pathology and Microbiology",
  "MDS in Pedodontics and Preventive Dentistry",
  "MDS in Oral Medicine and Radiology",
  "MDS in Public Health Dentistry",
  "PhD in Dental Sciences"
]


 const pharmadep=[
  "B.Pharm. (Bachelor of Pharmacy)",
  "M.Pharm. (Master of Pharmacy) in Pharmaceutics",
  "M.Pharm. (Master of Pharmacy) in Pharmacology",
  "M.Pharm. (Master of Pharmacy) in Pharmaceutical Chemistry",
  "M.Pharm. (Master of Pharmacy) in Pharmacognosy",
  "Pharm.D. (Doctor of Pharmacy)",
  "Ph.D. (Doctor of Philosophy) in Pharmaceutical Sciences"
]


  const handlesignup=async(e)=>{
   e.preventDefault();
   try
   {
    if(actions.name === '')
    {
      return toast({
        status:'error',
        description:'Name is required',
        duration:3000
      })
      }
    
      if(actions.email === '')
        {
          return toast({
            status:'error',
            description:'Email is required',
            duration:3000
          })
          } 

       if(actions.password === '')
            {
              return toast({
                status:'error',
                description:'Password is required',
                duration:3000
              })
              } 
       
         if (actions.college === '' || 
             actions.department === ''
         )     
          {
            return toast({
              status:'error',
              description:'College and Department is required',
              duration:3000
            })
          }

    setloading(true)
    const res= await 
    fetch('/api/user/register',{
      method:'POST',
      headers:
      {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(actions)
    })

    const data=await res.json()

    console.log(data)

    if(data.error)
    {
      toast({
        title:'Error',
        description:data.error,
        duration:3000
      })
     return;
    }
    else{
      var token=JSON.stringify({
        token:data,
        expiresAt:new Date().getTime() + 2*24*60*60*1000
      })
      localStorage.setItem('token',token)
      setuserstate(JSON.parse(token))
      navigate('/')
      toast({description:'Registeration Completed'})
    }
  }
  catch(err)
  {
    console.log(err)
    toast({
      status:'error',
      description:err.message,
      duration:3000
    })
  }
  finally{
    setloading(false)
  }
  }

  const handlecollegeselct=(college)=>{
    setactions({
      ...actions,
      college:college
    })
  }
  
  const clearexistingdep=()=>{
   if (actions.department !== '')
   {
    setactions({
      ...actions,
      department:''
    })
   }
  }

  console.log(actions)
  return (
    <Flex
      align={'center'}
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} 
      maxW={{
        md:'lg',
        lg:'lg',
        sm:'lg',
        base:'md'}}
       py={5} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} 
          textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
         border={'1px solid'}
         borderColor={{
          md:'gray.light',
          lg:'gray.light',
          sm:'gray.light',
          base:'transparent '
        }}
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.dark')}
          boxShadow={''}
          p={{
            md:'8',
            lg:'8',
            sm:'8',
            base:'6'
          }}>
          <Stack spacing={4}>
          <HStack>
          <FormControl  isRequired>
              <FormLabel>User name</FormLabel>
              <Input type="text" 
              placeholder='Enter your name'
               border={'2px solid'}
               borderColor={'gray.300'}
                 onChange={(e)=>setactions({...actions,username:e.target.value})}/>
            </FormControl>
            </HStack>
            <FormControl  isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" 
               border={'2px solid'}
            placeholder='Enter you email'
               borderColor={'gray.300'}
                 onChange={(e)=>setactions({...actions,email:e.target.value})}/>
            </FormControl>
            <FormControl  isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
              placeholder='Enter you password'
                 border={'2px solid'}
                 borderColor={'gray.300'}
                type={showPassword ? 'text' : 'password'} 
                   onChange={(e)=>setactions({...actions,password:e.target.value})}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <FaEye/> : <FaEyeSlash />}
                   
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl  isRequired>
              <FormLabel>
                College
              </FormLabel>
              <Menu>
                <MenuButton width={'full'}
                border={'2px solid'} as={Button}
                borderColor={'gray.300'}
                _focus={{
                  bg:'none',
                  border:'3px solid',
                  borderColor:'blue.500'
                }} 
                // maxW={'full'}
                // overflowY={'auto'}
                cursor={'auto'}
                onClick={clearexistingdep}
                >
                <Flex align={'center'} width={'full'}
                justify={'space-between'}>
                <Text fontWeight={'400'}>
                {actions.college ? 
                actions?.college.length > 30 ? actions.college.slice(0,30) + '...'  : actions.college : "Select college"} 
                 </Text>          
                 <FaAngleDown/>
                </Flex>
                </MenuButton>
                <MenuList
              _focus={{
                bg:'none'
               }}          
               fontSize={'13px'}   
                maxH={'200px'}
                overflowY={'auto'}
                  >
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>handlecollegeselct('Aarupadi Veedu Instuite of Technology')}
                 >
                 <Flex align="center">
              <Image src={avit}w={8} h={8} mr={2} />
            <Text>Aarupadi Veedu Institute of Technology</Text>
                </Flex>
                 </MenuItem> 
                 <MenuItem  
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's Medical College & Hospital")}
                 >
                 <Flex align="center">
              <Image src={vinaykmedical} 
              w={8} h={8} mr={2} />
            <Text>Vinayaka Mission's Medical College & Hospital </Text>
                </Flex>
                 </MenuItem> 
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct('School of Allied Health Science')}
                 >
                 <Flex align="center">
              <Image src={fahs} w={8} h={8} mr={2} />
            <Text>
              School of Allied Health Sciences 
            </Text>
                </Flex>
                 </MenuItem> 
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's Law school")}
                 >
                 <Flex align="center">
              <Image src={vmrflaw} w={8} h={8} borderRadius={'5'} mr={2} />
            <Text>
             Vinayaka Mission's Law school
            </Text>
                </Flex>
                 </MenuItem> 
                 
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct('School of Arts and Sciences')}
                 >
                 <Flex align="center">
              <Image src={sas} w={8} h={8} mr={2} />
            <Text>
              School of Arts and Sciences
            </Text>
                </Flex>
                 </MenuItem> 
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's Kirupananda Variyar Engingerring College")}
                 >
                 <Flex align="center">
              <Image src={kireng} w={8} h={8} mr={2} />
            <Text>
              Vinayaka Mission's Kirupananda Variyar Engingeering College
            </Text>
                </Flex>
                 </MenuItem>
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinyaka Mission's College of Pharamacy")}
                 >
                 <Flex align="center">
              <Image src={vmrfpharma} w={8} h={8} mr={2} />
            <Text>
              Vinyaka Mission's College of Pharamacy 
            </Text>
                </Flex>
                 </MenuItem> 
                 
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's Kirupananda Varriyar Arts & Science college")}
                 >
                 <Flex align="center">
              <Image src={kirubarts} w={8} h={8} mr={2} />
            <Text>
              Vinayaka Mission's Kirupananda Varriyar Arts & Sciences college
            </Text>
                </Flex>
                 </MenuItem>  
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's  Arts & Science College")}
                 >
                 <Flex align="center">
              <Image src={vmrflogo} w={8} h={8} mr={2} />
            <Text>
            Vinayaka Mission's Arts & Science College
            </Text>
                </Flex>
                 </MenuItem>  
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's Kirupananda Varriyar Dental Collge")}
                 >
                 <Flex align="center">
              <Image src={kirubdental} w={8} h={8} mr={2} />
            <Text>
            Vinayaka Mission's Kirupananda Varriyar Dental Collge
            </Text>
                </Flex>
                 </MenuItem>  
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Missions Sankaracharya Dental College")}
                 >
                 <Flex align="center">
              <Image src={vmrfsdentallgo} w={8} h={8} mr={2} />
            <Text>
              Vinayka Missions Sankaracharya Dental College
            </Text>
                </Flex>
                 </MenuItem>  
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's College of  Allied Health Science")}
                 >
                 <Flex align="center">
              <Image src={fahs} w={8} h={8} mr={2} />
            <Text>
              Vinayaka Mission's Coolege of  Allied Health Sciences
            </Text>
                </Flex>
                 </MenuItem> 
                 <MenuItem 
                 _focus={{
                  bg:'none'
                 }}
                 _hover={{
                  bg:'gray.300'
                 }}
                 onClick={()=>
                  handlecollegeselct("Vinayaka Mission's Engineering College")}
                 >
                 <Flex align="center">
              <Image src={vmrflogo} w={8} h={8} mr={2} />
            <Text>
            Vinayaka Mission's Engineering College
            </Text>
                </Flex>
                 </MenuItem>  
                </MenuList>
              </Menu>
            </FormControl>
            <Flex gap={'2'}>
              <Box>
                <FormControl  isRequired>
                  <FormLabel>Department</FormLabel>
                   <Select width={{
                    md:'180px',
                    lg:'180px',
                    sm:'180px',
                    base:'150px'}}
                    border={'2px solid'}
                    // fontSize={'1px'}
                    borderColor={'gray.300'}
                   onChange={(e)=>setactions(
                    {...actions,department:e.target.value})} >
                   <option  className='option5' value="" hidden selected disabled>
                     Select Department
                   </option>
                    { 
                     actions.college === "Vinayaka Missions Sankaracharya Dental College"  ? 
                     dentaldep.map((value)=>(
                      <option value={value}>{value}</option>
                     )) : actions.college === "Aarupadi Veedu Instuite of Technology" ? 
                     engdep.map((value1)=>(
                      <option value={value1}>{value1}</option>
                     )) : actions.college === "Vinayaka Mission's Kirupananda Varriyar Dental Collge"   ? 
                      dentaldep.map((value)=>(
                        <option value={value}>{value}</option>
                      )) : actions.college === "Vinayaka Mission's Medical College & Hospital" ?
                      medicaldep.map((value)=>(
                        <option value={value}>{value}</option>
                      )) : actions.college === "School of Allied Health Science" ? 
                      alliedhealthsciencdep.map((value)=>(
                        <option value={value}>{value}</option>
                      )) : actions.college === "Vinayaka Mission's Law school" ?
                      lawdep.map((value)=>(
                        <option value={value}>{value}</option>
                      )) : actions.college === 'School of Arts and Sciences' ? 
                      sasdep.map((value)=>(
                        <option value={value}>{value}</option>
                      )) : actions.college === "Vinayaka Mission's Kirupananda Variyar Engingerring College" ?
                      engdep.map((value)=>(
                        <option value={value}>{value}</option>
                      ))
                      : actions.college === "Vinyaka Mission's College of Pharamacy" ?
                      pharmadep.map((val)=>(
                        <option value={val}>{val}</option>
                      )) :
                      actions.college === "Vinayaka Mission's Kirupananda Varriyar Arts & Science college" ?
                      artsdep.map((value)=>(
                        <option value={value}>{value}</option>
                      )): 
                      actions.college === "Vinayaka Mission's College of Arts & Sciences" ?
                      artsdep.map((value)=>(
                        <option value={value}>{value}</option>
                      )): 
                      actions.college === "Vinayaka Mission's College of  Allied Health Science" ?
                      alliedhealthsciencdep.map((value)=>(
                        <option value={value}>{value}</option>
                      )) :
                      actions.college === "Vinayaka Mission's Engineering College" ?
                      engdep.map((value)=>(
                        <option value={value}>{value}</option>
                      )) : 
                       <option value={''}>
                      </option> 
                    }

                   </Select>
                </FormControl>
              </Box>  
              <Box>
                <FormControl isRequired>
                  <FormLabel>Student/FA</FormLabel>
                  <Select
                  pl={0}
                   width={{
                    md:'180px',
                    lg:'180px',
                    sm:'180px',
                    base:'150px'}}
                   border={'2px solid'}
                   borderColor={'gray.300'}
                   onChange={(e)=>setactions(
                    {...actions,isfa:e.target.value})}>
                       <option value="" hidden selected disabled>
                     Select Role
                   </option>
                    <option value={false}>
                        Student
                      </option>
                   <option value={true}>
                    Faculity</option>
                  </Select>
                </FormControl>
              </Box>
            </Flex>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('gray.600','gray.700')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('gray.700','gray.800'),
                }}
                onClick={handlesignup}>
                {loading ? <Spinner/> :  "Sign up"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}
                onClick={()=>setatomstate('login')}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register
