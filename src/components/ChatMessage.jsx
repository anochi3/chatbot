import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-1.jpg';
import './ChatMessage.css';


function ChatMessage({ message, sender, sendTime }){
  return (
    <div className={
      sender === 'user' 
      ? 'chat-message-user'
      : 'chat-message-robot'
    }>
      { sender === 'robot' && 
      (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )
      }
      <div className="chat-message-text">
        {message}
        <p className={`chat-message-send-time chat-message-send-time-${sender}`}>{sendTime}</p>
      </div>
      { sender === 'user' && 
      (
        <img src={UserProfileImage} className="chat-message-profile"/>
      )}
    </div>
  );
}

export default ChatMessage;