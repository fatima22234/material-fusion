"use client";
import React from 'react'
import Image from 'next/image';
import { Box, Typography,Button } from '@mui/material'
import CustomCard from './component/Card';
import InsightsIcon from '@mui/icons-material/Insights';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { useUser} from "@clerk/nextjs";
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const Page = () => {
  const {isSignedIn, isLoaded, user} = useUser();

const router= useRouter();
 const goToInventory=()=>{
   router.push('/inventory')
 }



  return (
    <>
 
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"  >
      
         <Box padding={10}  display="flex"  sx={{height:{xs:"120vh", md:"100vh" },flexDirection:{xs:"column", md:"row"} }}
         style={{
          background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
        }}
         >
         <Box sx={{width:{xs:"100%" ,md:"50%"}}} display="flex" 
         flexDirection="column" justifyContent="center" 
          >
          <Typography sx={{width:{xs:"100%" ,md:"80%"}, }} position='relative' color="#ffff"  >
            Elevate your inventory management with Material Fusion Inventory. 
          Our platform provides real-time tracking, advanced analytics, and seamless
           integration to boost efficiency and simplify operations. Streamline your
            processes and make informed decisions effortlessly.
            </Typography>
                    <Link href={isSignedIn?'/inventory':'/sign-in'} passHref>
            <Button  sx={{position:"relative" ,top:"10%", width:"200px", 
            variant:{sx:'contained', md:'outlined'}, color:{xs:'white'}, border:{xs:"1px solid white"}}} 
            onClick={()=>goToInventory()}
            >Go To Inventory</Button></Link>
            </Box>
            <Box sx={{width:{xs:"100%" ,md:"50%"},display:{xs:"none", md:"flex" } }} justifyContent="center" alignItems="center">

            <Image
        src="https://www.unleashedsoftware.com/wp-content/uploads/2024/02/Pillar-Page-Hero-Placeholder-1024x758.png.webp" // Corrected image path
        alt="Descriptive text for screen readers"
        // style={{maxWidth:"100%", height:"auto"}}
        width={500}
        height={400}
        
      />
            </Box>

         </Box>

        <Box display="flex" flexDirection="column" gap={5} 
        height="80vh" justifyContent="center" alignItems="center">
          <Typography variant='h3' sx={{color:{xs:"white", md:"text.secondary"}}}>Features</Typography>
        <Box display="flex" sx={{flexDirection:{xs:"column", md:"row" }, gap:{xs:2,md:5}}}   justifyContent="center" alignItems="center">
            <CustomCard imgSrc={<AccessTimeFilledIcon/>} 
            title="Real-Time Tracking"
            description="Get instant updates on stock levels to prevent shortages and overstocking.
             Always access precise inventory data to make well-informed decisions."
            />
            <CustomCard imgSrc={<InsightsIcon/>}
            title="Advanced Analytics"
            description="Utilize advanced analytics to track performance and trends.
             Custom reports and dashboards empower you to make informed decisions
              and optimize your inventory.

"
            />
            <CustomCard imgSrc={<BrowserUpdatedIcon/>}
            title="Effortless Updates"
            description="Easily update inventory data and configurations in real-time. 
            Maintain accuracy and efficiency with minimal effort, ensuring your system stays current."
            />
        </Box>
        </Box>

     



    </Box>
    </>
  )
}

export default Page