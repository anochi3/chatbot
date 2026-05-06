import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages }){
  const [ inputText, setInputText ] = useState('');
  
  const inputFieldRef = useRef(null);

  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    if(inputFieldRef.current){
        inputFieldRef.current.focus();
      }
  })

  function saveInputText(event){
    setInputText(event.target.value);
  }

  async function sendMessage(){
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
      }

    ]

    setInputText('');

    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinner} className="loading-image"/>,
        sender: 'robot',
        id: crypto.randomUUID(),
      }
    ])
    
    setIsLoading(true);

    try{

    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
      }

    ]);
    }finally{
      setIsLoading(false);
    } 
    
  }

  return (
    <div className="chat-input-container">
      <input 
        className="chat-input"
        placeholder="Send a message to Chatbot" 
        size="30" 
        onChange={saveInputText}
        value={inputText}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !(isLoading || !inputText.trim())){
            sendMessage();  
          }
          else if(event.key === 'Escape'){
            setInputText('');
          }
        }}
        disabled = {isLoading}
        ref={inputFieldRef}
      />
      <button
        className="send-button"
        onClick={sendMessage}
        disabled = {isLoading || !inputText.trim() }
        >Send</button>
    </div>
  );
}