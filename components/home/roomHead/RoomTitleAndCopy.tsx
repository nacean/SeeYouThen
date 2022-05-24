import React from 'react';
import { Typography } from 'antd';
import styles from './RoomTitleAndCopy.module.scss';
import { useRecoilValue } from 'recoil';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';

const { Paragraph } = Typography;

function RoomTitleAndCopy() {
  const roomName = useRecoilValue(roomNameState);
  const roomId = useRecoilValue(roomIdState);
  return (
    <div className={styles.roomHeadContainer}>
      <h2>{roomName}</h2>
      <div className={styles.copyUrl}>
        <Paragraph copyable={{ text: roomId as string }}>
          주소를 복사하고 공유하세요
        </Paragraph>
      </div>
    </div>
  );
}

export default RoomTitleAndCopy;
