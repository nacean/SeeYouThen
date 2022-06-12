import React from 'react';
import styles from './RoomUserAddForm.module.scss';
import { Form, Input, Button } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import addingRoomUserState from '../../../atoms/roomUserAtoms/addingRoomUserState';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import addRoomInfo from '../../../modules/dbModules/addRoomInfo';
import timeBlockState from '../../../atoms/timeAtoms/timeBlockState';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import datePickState from '../../../atoms/timeAtoms/datePickState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';
import { useIsMobile } from '../../responsive/responsiveCollection';
import nowPickTimeState from '../../../atoms/timeAtoms/nowPickTimeState';

function RoomUserAddForm() {
  const isMobile = useIsMobile();
  const [addingRoomUser, setAddingRoomUser] =
    useRecoilState(addingRoomUserState);
  const [roomUsers, setRoomUsers] = useRecoilState(roomUsersState);
  const setNowPickUser = useSetRecoilState(nowPickUserState);
  const [form] = Form.useForm();
  const pickedDates = useRecoilValue(datePickState);
  const pickedTimes = useRecoilValue(nowPickTimeState);
  const timeBlocks = useRecoilValue(timeBlockState);
  const roomId = useRecoilValue(roomIdState);
  const roomName = useRecoilValue(roomNameState);

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
    const newRoomUsers: string[] = [...roomUsers, addingRoomUser];
    setRoomUsers(newRoomUsers);
    setNowPickUser(addingRoomUser);
    setAddingRoomUser(null);
    form.setFieldsValue({
      username: null,
    });
    addRoomInfo({
      pickedDates,
      pickedTimes,
      timeBlocks,
      roomUsers: newRoomUsers,
      roomId,
      roomName,
    });
  };

  return (
    <div className={styles.roomLogInContainer}>
      <Form
        name="roomLoginForm"
        layout={isMobile ? 'horizontal' : 'inline'}
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
          <Button type="primary" htmlType="submit" block={isMobile}>
            추가
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RoomUserAddForm;
