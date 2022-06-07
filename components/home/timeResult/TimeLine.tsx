import moment from 'moment';
import React from 'react';
import styles from './TimeLine.module.scss';

function TimeLine() {
  const makeTimeLine = () => {
    const timeLines: string[] = [];
    timeLines.push('time');

    const TIME_MAX_LENGTH = 48;
    for (let i = 0; i <= TIME_MAX_LENGTH; i++) {
      timeLines.push(
        moment('00:00', 'HH:mm')
          .add(i * 30, 'minutes')
          .format('HH:mm'),
      );
    }

    let timeLineKeyNum = 0;

    return timeLines.map((timeLineParam: string) => (
      <li key={timeLineKeyNum++} className={styles.timeLineList}>
        {timeLineParam}
      </li>
    ));
  };
  return <ul>{makeTimeLine()}</ul>;
}

export default TimeLine;
