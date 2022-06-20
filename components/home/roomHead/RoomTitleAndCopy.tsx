import React from 'react';
import { Typography } from 'antd';
import styles from './RoomTitleAndCopy.module.scss';
import { useRecoilValue } from 'recoil';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';
import KakaoShareButton from './KakaoShareButton';

const { Paragraph } = Typography;

function RoomTitleAndCopy() {
  const roomName = useRecoilValue(roomNameState);
  const roomId = useRecoilValue(roomIdState);
  const roomUrl = `https://see-you-then.vercel.app/roomNo/${roomId}?roomName=${roomName}`;

  return (
    <div className={styles.roomHeadContainer}>
      <h2>{roomName}</h2>
      <div className={styles.copyUrl}>
        <Paragraph copyable={{ text: roomUrl }}>
          주소를 복사하고 공유하세요
        </Paragraph>
      </div>
      <KakaoShareButton roomName={roomName} roomUrl={roomUrl} />
    </div>
  );
}

export default RoomTitleAndCopy;
