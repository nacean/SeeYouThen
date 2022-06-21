import React from 'react';
import styles from './RoomTitleAndCopy.module.scss';
import { useRecoilValue } from 'recoil';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';
import KakaoShareButton from './KakaoShareButton';
import UrlCopy from './UrlCopy';

function RoomTitleAndCopy() {
  const roomName = useRecoilValue(roomNameState);
  const roomId = useRecoilValue(roomIdState);
  const roomUrl = `https://see-you-then.vercel.app/roomNo/${roomId}?roomName=${roomName}`;

  return (
    <div className={styles.roomHeadContainer}>
      <h2>{roomName}</h2>
      <UrlCopy roomUrl={roomUrl} />
      <KakaoShareButton roomName={roomName} roomUrl={roomUrl} />
    </div>
  );
}

export default RoomTitleAndCopy;
