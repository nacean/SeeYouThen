import React from 'react';
import styles from './RoomUserAddForm.module.scss';
import { Form, Input, Button } from 'antd';
import { useRecoilState } from 'recoil';
import addingRoomUserState from '../../../atoms/roomUserAtoms/addingRoomUserState';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';

function RoomUserAddForm() {
  const [addingRoomUser, setAddingRoomUser] =
    useRecoilState(addingRoomUserState);
  const [roomUsers, setRoomUsers] = useRecoilState(roomUsersState);
  const [form] = Form.useForm();

  const onAddUserFormFinish = () => {
    if (addingRoomUser === null || addingRoomUser === '') {
      alert('1글자 이상의 이름만 가능합니다');
      return;
    }
    const isThereSameName = roomUsers.indexOf(addingRoomUser);
    if (isThereSameName !== -1) {
      alert('동일한 이름이 존재합니다!');
      return;
    }
    setRoomUsers([...roomUsers, addingRoomUser]);
    setAddingRoomUser(null);
    form.setFieldsValue({
      username: null,
    });
  };

  return (
    <div className={styles.roomLogInContainer}>
      <Form
        name="roomLoginForm"
        layout="inline"
        onFinish={onAddUserFormFinish}
        form={form}
      >
        <Form.Item
          label="Name"
          name="username"
          rules={[
            { required: true, message: '이름은 한 글자 이상이어야합니다' },
          ]}
        >
          <Input
            placeholder="본인의 이름을 추가하세요"
            value={addingRoomUser}
            onChange={(e) => {
              setAddingRoomUser(e.target.value);
            }}
            allowClear
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            추가
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RoomUserAddForm;
