import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './index.css';

const Room = () => {
  const [roomCode, setRoomCode ] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (ev) => {
    ev.preventDefault();
    navigate(`/live/${roomCode}`)
  }
  return (
    <>
    <div className='room'>
      <form className='form' onSubmit={handleFormSubmit}>
        <div>
          <label>Enter Channel Name</label>
          <input value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)} 
          type='text' required
          placeholder='Enter Channel Name'/>
        </div>

        <button type='submit' >Enter Channel</button>

    <p className='disclaimer'>Once the live-streaming ends please refresh the page to go back to the homepage.</p>    
      </form>
    </div>
    </>
  )
}

export default Room
