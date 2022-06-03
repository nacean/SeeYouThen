import React from 'react';
import { Button, Form, Input } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { useIsMobile } from '../responsive/responsiveCollection';

interface submitType {
  roomName: string;
}

function MakeRoomForm() {
  const roomRouter = useRouter();
  const isMobile = useIsMobile();

  const onFinish = (submitParam: submitType) => {
    const uuid = uuidv4();
    const { roomName } = submitParam;
    roomRouter.push(`/roomNo/${uuid}?roomName=${roomName}`);
  };
  return (
    <Form layout={isMobile ? 'horizontal' : 'inline'} onFinish={onFinish}>
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
  );
}

export default MakeRoomForm;
