import { Card } from 'antd';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import styles from './RoomUser.module.scss';

interface roomUserType {
  username: string;
}

function RoomUser({ username }: roomUserType) {
  const setNowPickUser = useSetRecoilState(nowPickUserState);
  const onClickUser = () => {
    setNowPickUser(username);
  };
  return (
    <li className={styles.roomUser} onClick={onClickUser}>
      {username}
    </li>
  );
}

export default RoomUser;
