import React from 'react';
import styles from './DatePickContainer.module.scss';
import DatePickForm from './DatePickForm';

function DatePickContainer() {
  return (
    <section className={styles.datePickContainer}>
      <h2>datePick</h2>
      <DatePickForm />
    </section>
  );
}

export default DatePickContainer;
