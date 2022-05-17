import React from 'react';
import styles from './DatePickContainer.module.scss';
import DatePickForm from './DatePickForm';
import RoomUserAddForm from './RoomUserAddForm';
import RoomUserList from './RoomUserList';

function DatePickContainer() {
  return (
    <section className={styles.datePickContainer}>
      <h2>datePick</h2>
      <DatePickForm />
      <RoomUserList />
      <RoomUserAddForm />
    </section>
  );
}

export default DatePickContainer;
