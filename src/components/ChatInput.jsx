import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css';
import dayjs from 'dayjs';

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
    let time = dayjs().valueOf();

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        sendTime: dayjs(time).format('h:mma')
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

    time = dayjs().valueOf();

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        sendTime: dayjs(time).format('h:mma')
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
      <button
        className="clear-button"
        onClick={() => {
          localStorage.setItem('messages', JSON.stringify([]));
          setChatMessages([]);
        
        }}
      >Clear</button>
    </div>
  );
}