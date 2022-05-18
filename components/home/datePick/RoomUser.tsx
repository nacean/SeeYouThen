import { Card } from 'antd';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import styles from './RoomUser.module.scss';

interface roomUserType {
  username: string;
  isPicked: Boolean;
}

function RoomUser({ username, isPicked }: roomUserType) {
  const setNowPickUser = useSetRecoilState(nowPickUserState);
  const onClickUser = () => {
    setNowPickUser(username);
  };
  return (
    <li
      className={isPicked ? styles.roomUserPicked : styles.roomUser}
      onClick={onClickUser}
      key={username}
    >
      {username}
    </li>
  );
}

export default RoomUser;
