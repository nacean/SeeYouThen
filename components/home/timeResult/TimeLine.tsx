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

    timeLines.push('time');
    while (1) {
      timeLines.push(startTime.format('HH:mm'));

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
