import React from 'react';
import styles from './RoomUserList.module.scss';
import { useRecoilValue } from 'recoil';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import RoomUser from './RoomUser';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import PickedUserDeleteButton from './PickedUserDeleteButton';

function RoomUserList() {
  const roomUsers = useRecoilValue(roomUsersState);
  const nowPickUser = useRecoilValue(nowPickUserState);

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
        {nowPickUser && <PickedUserDeleteButton />}
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
