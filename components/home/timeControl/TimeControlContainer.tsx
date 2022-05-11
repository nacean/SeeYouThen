import React from 'react';
import TimePickForm from './TimePickForm';
import styles from './TimeControlContainer.module.scss';
import PickedTimeShow from './PickedTimeShow';
function TimeControlContainer() {
  return (
    <section className={styles.timeControlContainer}>
      <h2>Add/Edit/Delete</h2>
      <TimePickForm />
      <PickedTimeShow />
    </section>
  );
}

export default TimeControlContainer;
