// "use client";
// import React from 'react'
// import { Box,Typography } from '@mui/material'
// import Chatbot from './Chat';
// const Header = () => {
//   return (
//     <Box width="100%" textAlign="center" justifyContent="space-between" >
//     <Typography variant="h4" p={2} fontWeight='900'>Material Fusion</Typography>

//     </Box>
//   )
// }

// export default Header
// "use client";

import React from 'react'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Toolbar, AppBar, Button,Typography, Box } from '@mui/material';
import Link from 'next/link'; 
import Image from 'next/image';
const Navbar = () => {

  return (
    <AppBar position="static">
         <Toolbar sx={{background: 'linear-gradient(90deg, rgb(2, 1, 15) 0%, rgb(6, 6, 84) 35%, rgb(12, 199, 236) 100%)', pt:1}}>
          
          
            
            <Box sx={{flexGrow:1}}>
            <Link href='/' style={{textDecoration:'none', color:'inherit'}}>
            MATERIAL FUSION
                </Link>
                </Box>
                   

          <SignedOut>
            
            <Link href='/sign-in' passHref>
            <Button sx={{color:'white'}}>
            Login
            </Button>
            </Link>

            <Link href='/sign-up' passHref>
            <Button sx={{color:'white'}}>
            Sign up
            </Button>
            </Link>

          </SignedOut>

          <SignedIn>
          <Box>
          <Link href='/inventory'>
          <Button sx={{borderRadius:'50%', color:'white'}}>
    Inventory
            </Button>
            </Link>
          </Box>
          
            <Box sx={{zIndex:1000}}>
            <UserButton/>
            </Box>
            
          </SignedIn>

         </Toolbar>
      </AppBar>
  )
}

export default Navbar