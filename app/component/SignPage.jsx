import React from 'react'
import { Typography,Box } from '@mui/material'
const SignPage = (props) => {
  return (
    <Box  sx={{height:{md:'100vh'},display:{sm:'flex', xs:'flex'}, flexDirection:'row' }}
    justifyContent='center' alignItems='center' >

    <Box width='50%' height='100%' sx={{display:{sm:'none', xs:'none',md:'flex', lg:'flex'}
}}>
          <video src='https://cdn.dribbble.com/uploads/48226/original/b8bd4e4273cceae2889d9d259b04f732.mp4?1689028949'
           style={{width:'100%', height:'100%', objectFit:'cover'}} muted loop autoPlay
           />
        </Box>

    <Box  flexDirection='column' justifyContent='center' alignItems='center' 
    
     sx={{bgcolor:'#020618', width:{md:'50%'}, display:{md:'flex'} , my:{sm:2, xs:2}}}  >
        
        <Box zIndex={1000} >
        {props.component}
        </Box>
    </Box>

    </Box>
  )
}

export default SignPage