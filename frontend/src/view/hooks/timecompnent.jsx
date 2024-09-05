import { Text } from '@chakra-ui/react'
import { min, set } from 'date-fns'
import React, { useEffect, useState } from 'react'

const Timecomponent = ({time}) => {
  const [timeageo,settimeago]=useState('')
  const createdtime=new Date(time)
  const currenttime=new Date()
  const timedifference=Math.abs(currenttime - createdtime )/1000

  useEffect(()=>{
    const handletime=()=>{    
        if(timedifference < 60)
            {
             settimeago('1 m')
            }
        else if(timedifference < 3600)
            {
                const minute=Math.floor(timedifference/60)
                settimeago(
                   `${minute === 0 ? 1 : minute} m `
                )
            }
         else if(timedifference < 86400)
            {
                const hour=Math.floor(timedifference/3600)
                settimeago(`${hour} h`)
            }  
         else
         {
            const interval=setInterval(()=>{
             handletime()
            },[60000])
           const day=Math.floor(timedifference/86400)
           settimeago(`${day} d`) 
         }    
        return ()=>clearInterval() 
    }
    handletime()
  },[time])
  return (
    <Text color={'gray.light'} fontSize={'sm'}>
        {timeageo}
    </Text>
  )
}

export default Timecomponent