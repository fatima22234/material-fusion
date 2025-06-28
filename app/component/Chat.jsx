"use client";

import { Box, Button, Typography, Stack, TextField, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import ReactMarkdown from 'react-markdown'
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
const Chatbot = () => {
  // using useRef to scroll down automatically
  const scrollContainerRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false)
  // to store all the messages
  const [allMessages, setAllMessages] = useState([
    {
      role: "assistant",
      content: "Hi, How can i help you today?",
    },
  ]);

  // to take input from user and send it to backend and chaneg state
  const [userMessage, setUserMessage] = useState("");

  // function to call the api and get response + store it
  const sendMessage = async () => {
    setAllMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    // sene message function uses the state which was there at the time of
    // function invoking so emptying this state does not affect the api call 'userMessage'
    //as a result, the previous state holding user message is included in api request and this line is
    //used to clear the input placeolder
    setUserMessage("");
    const getResponse = await fetch("/api/chat_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...allMessages,
        { role: "user", content: userMessage }],
    }),
    });
    const result = await getResponse.json();
    if (result && result.assistantMessage) {
      // Update the conversation with the assistant's response
      setAllMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the placeholder message
        { role: "assistant", content: result.assistantMessage },
      ]);
    } else {
      console.error("Invalid response format:", result);
    }
  };


  useEffect(() => {
    if(scrollContainerRef.current){
        scrollContainerRef.current.scrollTop=scrollContainerRef.current.scrollHeight;
    }
  }, [allMessages]);

  const handleClick = () => {
    sendMessage();
  };

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
<>
    {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            bgcolor: '#2E236C',
            color: 'white',
            zIndex: 1000,
            '&:hover': { bgcolor: '#17153B' },
          }}
        >
          <ChatBubbleIcon />
        </IconButton>
      )}

    {isOpen && (<Box position="fixed"
    top="15%"
    left="67%"
    width="30vw"
    height="80vh"
    bgcolor="#F3E8FF"
    borderRadius={3}
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    boxShadow={3}
    zIndex={9999}
    p={2}>
        
        <Box alignSelf='flex-end'>
        <IconButton
        onClick={()=>setIsOpen(false)}>
            <CloseIcon sx={{color:'purple'}}/>
        </IconButton>
        </Box>

      <Box width='90%' height='65vh' mt={0} mb={3} 
      display="flex" flexDirection='column'
       justifyContent="center" alignItems="center" paddingBottom='10px' border="2px solid purple" 
       backgroundColor='white'
        borderRadius={3}>
        <Stack ref={scrollContainerRef} 
         direction="column" height="80%"
          sx={{overflowY: "auto", gap:1, m:1, }}
        >
          {allMessages.map((msg, index) => (

            <Box
              key={index}
              sx={{
                display:"flex",
                bgcolor: msg.role === "user" ? "#694F8E" : "#B692C2",
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                p:0,
                borderRadius:3,
                maxWidth:'80%',
              }}
            >
              <Box color="white" 
              textAlign= {msg.role ==="user"? "right":"left"} mx={2} my={1}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
                </Box>
            </Box>
          ))}
        </Stack>
        
          <Stack px={2} width="100%" direction="row" gap={1}>

          <TextField
          type="text"
          value={userMessage}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          name="user"
          
          sx={{
            flex: 9, // Allows the TextField to take up available space
            minWidth: 0, // Prevents the TextField from exceeding its container
            bgcolor:'#EEEEEE' ,
           ':focused': {
            border: '2px solid green',
            // Border color when focused
          },
          }}
          
        />
        <Button onClick={handleClick} variant="contained" sx={{
            flex: 1, // Allows the TextField to take up available space
            minWidth: 0, // Prevents the TextField from exceeding its container
            bgcolor:"#2E236C",
            textTransform:"capitalize",
            borderRadius:2,
            
            ':hover':{
                bgcolor:'#17153B'
            }
          }}><Typography fontSize={15}>Send</Typography><SendIcon fontSize="2px"/></Button>
          </Stack>

      </Box>
    </Box>)

    
}
</>
  );
};

export default Chatbot;
