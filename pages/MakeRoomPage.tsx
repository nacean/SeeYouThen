import React from 'react';
import styles from './MakeRoomPage.module.scss';
import MakeRoomForm from '../components/makeRoom/MakeRoomForm';

function MakeRoomPage() {
  return (
    <article className={styles.makeRoomPageContainer}>
      <h2>방 만들기</h2>
      <MakeRoomForm />
    </article>
  );
}

export default MakeRoomPage;
