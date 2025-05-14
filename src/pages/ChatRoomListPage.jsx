// ChatRoomListPage.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
`;

const RoomCard = styled.div`
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fffdf8;
  margin-bottom: 16px;
  cursor: pointer;
  &:hover {
    background: #fdf3dc;
  }
`;

const ChatRoomListPage = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/chatrooms/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }).then((res) => setChatRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <h2>📋 채팅방 리스트</h2>
      {chatRooms.length === 0 ? (
        <p>참여한 채팅방이 없습니다.</p>
      ) : (
        chatRooms.map(room => (
          <RoomCard key={room.id} onClick={() => navigate(`/chat/${room.id}`)}>
            🗨️ {room.room_name}
          </RoomCard>
        ))
      )}
    </Container>
  );
};

export default ChatRoomListPage;
