import moment from 'moment';
import React from 'react';
import { useRecoilValue } from 'recoil';
import nowPickTimeState from '../../../atoms/timeAtoms/nowPickTimeState';
import styles from './TimeLine.module.scss';

function TimeLine() {
  const pickedTimes = useRecoilValue(nowPickTimeState);
  const makeTimeLine = () => {
    if (!pickedTimes[0] || !pickedTimes[1]) return;

    let startTime = pickedTimes[0].clone();
    const endTime = pickedTimes[1].clone();

    const timeLines: string[] = [];

    timeLines.push('');
    while (1) {
      const unRefinedTime = startTime.format('HH:mm');
      if (unRefinedTime.slice(3, 5) !== '30') {
        if (Number(unRefinedTime.slice(0, 2)) < 12) {
          const newNumber =
            unRefinedTime[0] === '0'
              ? unRefinedTime.slice(1, 2)
              : unRefinedTime.slice(0, 2);
          timeLines.push(`${newNumber} AM`);
        } else if (unRefinedTime.slice(0, 2) === '12') {
          timeLines.push('12 PM');
        } else {
          const newNumber = Number(unRefinedTime.slice(0, 2)) - 12;
          timeLines.push(`${String(newNumber)} PM`);
        }
      } else {
        timeLines.push('');
      }

      if (startTime.format('HH:mm') === endTime.format('HH:mm')) break;

      startTime = startTime.add(30, 'm');
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
