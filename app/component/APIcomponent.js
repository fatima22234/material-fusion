// "use client"
// import React, { useEffect, useState } from 'react'
// import { Box, Typography } from '@mui/material'


// const APIcomponent = ({image,onTagDetected}) => {
//     const [result,setResult]=useState(null)
//     const [isProcessed, setIsProcessed] = useState(false); 
//     const [error, setError] = useState(null);
// const url=`https://api-inference.huggingface.co/models/microsoft/resnet-50`;
//    const HF_KEY = 'Bearer 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'

// useEffect(()=>{
//   if (!image || isProcessed) return; 
//     const fetchItem= async()=>{
        
//           const base64Image = image.split(',')[1]; // Get the base64 part
//             const binaryData = Buffer.from(base64Image, 'base64');
//         try{
//           const response= await fetch(url,
//               {
//                 method:'POST',
//                   headers:{
//                       'Prediction-Key':HF_KEY,
//                        'Content-Type':'application/octet-stream'
//                   },
//                   body:binaryData
//               }
//           ) 

//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }

//         const data= await response.json();
//         console.log(data);
//         setResult(data);
//         setIsProcessed(true); 
//         if (onTagDetected) {
//           const highestProbabilityTag = await data.predictions[0].tagName;
//           onTagDetected(highestProbabilityTag); // Pass the tagName to the parent
//         }
//       }catch(error){
//             console.error('item couldnt be fetched:',error)
//             setError('failed fetch')
//         }
//   }

//   fetchItem()
//    },[image,onTagDetected,isProcessed ])

//   return (
//     <Box>
//     <Box>
//         {error && <Box>Error: {error}</Box>}
//         {result?(<Box>
//             <Typography >Item present in Picture is: <span sx={{color:'#003366', textAlign:'center'}}>{result.predictions[0].tagName}</ span></Typography></Box> )
//         :( <Box>Loading</Box> ) }
 
//     </Box>
//     </Box>

//   )
// }

// export default APIcomponent
"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const APIcomponent = ({ image, onTagDetected }) => {
  const [result, setResult] = useState(null);
  const [isProcessed, setIsProcessed] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Your Roboflow config
  const API_KEY =  process.env.ROBOFLOW_API_KEY;
  const WORKSPACE = process.env.WORKSPACE;
  const WORKFLOW_ID = process.env.WORKFLOW_ID; // Replace if you update the workflow ID
  const API_URL = `https://serverless.roboflow.com/infer/workflows/${WORKSPACE}/${WORKFLOW_ID}`;

  useEffect(() => {
    if (!image || isProcessed) return;

    const fetchItem = async () => {
      try {
        const response = await fetch("/api/classify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Roboflow result:", data);
        setResult(data);
        setIsProcessed(true);

        const detected = data?.outputs[0].predictions?.top || "No item detected";
console.log("Roboflow result:", data);
console.log(detected)
        if (detected && onTagDetected) {
          onTagDetected(detected);
        }
      } catch (err) {
        console.error("Item couldn't be fetched:", err);
        setError("Failed to fetch classification");
      }
    };

    fetchItem();
  }, [image, isProcessed, onTagDetected]);

  return (
    <Box>
      {error && <Box>Error: {error}</Box>}
      {result ? (
        <Typography>
          Detected Item:{" "}
          <span style={{ color: "#003366" }}>
            {result?.outputs[0].predictions?.top || "No item detected"}
          </span>
        </Typography>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default APIcomponent;
