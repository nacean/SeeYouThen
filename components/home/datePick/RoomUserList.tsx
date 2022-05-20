import React from 'react';
import styles from './RoomUserList.module.scss';
import { useRecoilState } from 'recoil';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import RoomUser from './RoomUser';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import { Button, Popconfirm } from 'antd';
import timeBlockState, {
  blockType,
  timeBlockType,
} from '../../../atoms/timeAtoms/timeBlockState';

function RoomUserList() {
  const [roomUsers, setRoomUsers] = useRecoilState(roomUsersState);
  const [nowPickUser, setNowPickUser] = useRecoilState(nowPickUserState);
  const [timeBlocks, setTimeBlocks] = useRecoilState(timeBlockState);

  const onDeleteNameConfirm = () => {
    const filteredRoomUsers: string[] = roomUsers.filter(
      (roomUserParam: string) => nowPickUser !== roomUserParam,
    );

    const newTimeBlocks: timeBlockType[] = timeBlocks.map(
      (timeBlockParam: timeBlockType) => ({
        ...timeBlockParam,
        blocks: timeBlockParam.blocks.map((blockParam: blockType) => ({
          ...blockParam,
          usingUsers: blockParam.usingUsers.filter(
            (userParam) => userParam !== nowPickUser,
          ),
        })),
      }),
    );

    setRoomUsers(filteredRoomUsers);
    setTimeBlocks(newTimeBlocks);
    setNowPickUser(null);
  };

  return (
    <div className={styles.roomUserListContainer}>
      <div className={styles.pickedNameAndDelete}>
        {nowPickUser ? (
          <h3>
            현재 선택한 이름 : <h4>{nowPickUser}</h4>
          </h3>
        ) : (
          <h3>현재 선택된 이름이 없습니다</h3>
        )}
        <Popconfirm
          title="선택된 인원의 이름이 제거됩니다. 하시겠습니까?"
          onConfirm={onDeleteNameConfirm}
          okText="제거"
          cancelText="취소"
          placement="bottomLeft"
        >
          <Button danger>제거</Button>
        </Popconfirm>
      </div>
      <ul className={styles.roomUserList}>
        {roomUsers.map((roomUser: string) => (
          <RoomUser username={roomUser} isPicked={roomUser === nowPickUser} />
        ))}
      </ul>
    </div>
  );
}

export default RoomUserList;
