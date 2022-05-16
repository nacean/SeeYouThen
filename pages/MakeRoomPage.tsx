import { Button, Form, Input } from 'antd';
import React from 'react';
import styles from './MakeRoomPage.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

interface submitType {
  roomName: string;
}

function MakeRoomPage() {
  const roomRouter = useRouter();
  const onFinish = (submitParam: submitType) => {
    const uuid = uuidv4();
    const { roomName } = submitParam;
    roomRouter.push(`/roomNo/${uuid}?roomName=${roomName}`);
  };
  return (
    <article className={styles.makeRoomPageContainer}>
      <h2>방 만들기</h2>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item
          label="roomName"
          name="roomName"
          rules={[{ required: true, message: '방이름을 입력하세요!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            방만들기
          </Button>
        </Form.Item>
      </Form>
    </article>
  );
}

export default MakeRoomPage;
