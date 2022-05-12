import React from 'react';
import { useRecoilValue } from 'recoil';
import pickedTimesState from '../../../atoms/pickedTimesState';
import PickedTime from './PickedTime';
import styles from './PickedTimeShow.module.scss';
function PickedTimeShow() {
  const pickedTimes = useRecoilValue(pickedTimesState);
  return (
    <div className={styles.timeShowBox}>
      {pickedTimes.map((pickedTime) => (
        <PickedTime key={pickedTime.key} pickedTime={pickedTime} />
      ))}
    </div>
  );
}

export default PickedTimeShow;
