import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput';
import { Chatbot } from 'supersimpledev';
import ChatMessages from './components/ChatMessages';
import './App.css';


function App(){
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    Chatbot.addResponses(
      {
        'What can you do?' : "I only know how to flip a coin, roll a dice, or get today's date.",
        'ok' : 'Let me know if you need help with anything else!'
      }
    )
  },[])

  return (
    <div className="app-container">
      {chatMessages.length === 0 && <p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</p> }
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    
    </div>
  )
}

export default App
