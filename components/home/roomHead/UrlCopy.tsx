import React from 'react';
import { Typography } from 'antd';
import styles from './UrlCopy.module.scss';
const { Paragraph } = Typography;

interface urlCopyType {
  roomUrl: string;
}

function UrlCopy({ roomUrl }: urlCopyType) {
  return (
    <div className={styles.copyUrl}>
      <Paragraph copyable={{ text: roomUrl }}>
        주소를 복사하고 공유하세요
      </Paragraph>
    </div>
  );
}

export default UrlCopy;
