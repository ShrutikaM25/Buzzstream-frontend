
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate } from 'react-router-dom';
import config from '../../config.js'
const LiveStream = () => {
  const { roomId } = useParams();
  const videoContainerRef = useRef(null);

const navigate = useNavigate();

const navigateToHomePage = () => {
  navigate('/home/feed');
};

  useEffect(() => {
    const myMeeting = async (element) => {
      const { appID, serverSecret } = config.zego;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        'Shrutika'
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreamingMode,
          config: {
          },
        },
      });

      return () => {
        zp.leaveRoom();
        navigateToHomePage();
      };
    };  

    myMeeting();
    navigateToHomePage();
  }, [roomId]);

  return (
    <div className='room-page'>
      <div ref={videoContainerRef} />
      <div>
      <button onClick={navigateToHomePage}>End Live Stream</button>
      </div>
    </div>
  );
};

export default LiveStream;
