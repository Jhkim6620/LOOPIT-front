import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const ChatContainer = styled.div`
  max-width: 700px;
  margin: 40px auto;
  background-color: #fffdf7;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
`;

const Messages = styled.div`
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background: #fff;
  border-radius: 8px;
`;

const MessageBubble = styled.div`
  background-color: ${({ isMe }) => isMe ? '#daf8cb' : '#f1f0f0'};
  color: #333;
  padding: 10px 14px;
  margin: 8px 0;
  max-width: 60%;
  border-radius: 18px;
  align-self: ${({ isMe }) => (isMe ? 'flex-end' : 'flex-start')};
  display: inline-block;
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
`;

const ChatPage = () => {
  const { room_name } = useParams();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const myUsername = localStorage.getItem('username');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/chat/${room_name}/`);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data]);
    };
    setSocket(ws);
    return () => ws.close();
  }, [room_name]);

  const sendMessage = () => {
    if (socket && input.trim()) {
      socket.send(JSON.stringify({ message: input, sender: myUsername }));
      setMessages(prev => [...prev, { message: input, sender: myUsername }]);
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ChatContainer>
      <h2>💬 채팅방: {room_name}</h2>
      <Messages>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} isMe={msg.sender === myUsername}>
            <strong>{msg.sender}</strong><br />
            {msg.message}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </Messages>
      <InputRow>
        <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
        <Button onClick={sendMessage}>보내기</Button>
      </InputRow>
    </ChatContainer>
  );
};

export default ChatPage;