import React from 'react';
import { Typography } from 'antd';
import styles from './RoomTitleAndCopy.module.scss';

const { Paragraph } = Typography;

interface roomTitleAndCopyType {
  roomName: string | string[];
  roomId: string | string[];
}

function RoomTitleAndCopy({ roomName, roomId }: roomTitleAndCopyType) {
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
