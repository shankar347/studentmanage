import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {RecoilRoot} from 'recoil'
import {BrowserRouter} from 'react-router-dom'
import {ChakraProvider,ColorModeScript} from '@chakra-ui/react'
import {mode} from '@chakra-ui//theme-tools'
import {extendTheme} from '@chakra-ui/theme-utils'
import './index.css'
import { Socketcontextprovider } from './view/socket/socketcontext.jsx'


const styles={
  global:(props)=>({
body:{
  color:mode('grary.800','whiteAlpha.900')(props),
  bg:mode('gray.100','#101010')(props),
}
  }
  )
}

const config={
  initialColorMode:"light",
  useSystemColorMode:true
}


const colors={
  gray:{
    light:"#616161",
    dark:"#1e1e1e"
  }
}

const theme=extendTheme({config,styles,colors})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <RecoilRoot>
    <Socketcontextprovider>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App/>
    </ChakraProvider>
    </Socketcontextprovider>
  </RecoilRoot>
  </BrowserRouter>     
  </React.StrictMode>,
)
