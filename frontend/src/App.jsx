import { Container, useColorMode } from '@chakra-ui/react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Auth from './view/auth/auth'
import { useRecoilValue } from 'recoil'
import useratom from './view/atom/useratom'
import Searchcontext from './view/components/searchcontext'
import Poscontext from './view/components/postcontext'
import Header from './view/components/Header'
import Homepage from './view/components/homepage'
import UserProfileEdit from './view/auth/profile'
import Userpage from './view/user/userpage'
import Postpage from './view/components/postpage'
import Settinglists from './view/actions/settinglists'
import Actionlists from './view/actions/actionlists'
import Chatfile from './view/chat/chatfile'
import Logout from './view/auth/logout'
import Createpost from './view/components/createpost'
import { useEffect } from 'react'

function App() {
   

  const {pathname}=useLocation()
  const user1=useRecoilValue(useratom)
  const user=user1?.token

  // console.log(pathname)
  // console.log(user)
  const {colorMode} =useColorMode()
  const navigate=useNavigate()
  useEffect(()=>{
    
    let token=JSON.parse(localStorage.getItem('token'))
    if(token){
    const createdat=token?.expiresAt
    console.log(createdat < new Date().getTime())
    if(createdat > new Date().getTime())
    {
     localStorage.removeItem('token'),
     navigate('/auth')
    }
  }
   navigate('/auth')

  },[])

  return (
    <>
    <Searchcontext>
      <Poscontext>
     <Container 
      // color={'gray.400'}
      maxW={pathname === '/' ? 
      {md: "900px" ,
      base:'620px'} : 
      "620px"}
      // boxShadow={'0px 0px 2px 0px'}
      minH={'100vh'}
      // background={colorMode === "light" ? "gray.500" : ""}
      >
        <Header/>
     <Routes>
     <Route path='/' 
          element={user ? <Homepage/> :
           <Navigate to={'/auth'}/>}
           /> 
     <Route path='/auth' element={!user ?<Auth/>
     : <Navigate to={'/'} />}/> 
            <Route path='/profile' element={
            <UserProfileEdit/>
          } />
                    <Route path='/:id' element={
            user ? <Userpage/> : <Navigate to={'/'}/>
          } />
           <Route path='/:id/:postid' element={
         user ?   <Postpage/> : <Navigate to={'/'} />
          }/>
              <Route path='/chat' 
          element={user ? <Chatfile/> :
        <Navigate to={'/'}/>}
           />
             <Route path='/:id/settings'
           element={user ? 
            <Settinglists/> :
            <Navigate to={'/'} />
            }/>
            <Route path='/:id/settings/:category'
           element={user ? 
           <Actionlists/> :
           <Navigate to={'/'}/> }/> 
     </Routes>
     {user && <Logout/>}
     {user && <Createpost/>}
     </Container>
     </Poscontext>
     </Searchcontext>     
    </>
  )
}

export default App
