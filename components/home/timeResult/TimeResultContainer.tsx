import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import pickedTimesState, {
  pickedTimesType,
} from '../../../atoms/pickedTimesState';
import timeBlockState from '../../../atoms/timeBlockState';
import styles from './TimeResultContainer.module.scss';
function TimeResultContainer() {
  const [timeBlocks, setTimeBlocks] = useRecoilState(timeBlockState);
  const pickedTimes = useRecoilValue(pickedTimesState);

  useEffect(() => {
    console.log('mooyaho');
    const newTimeBlocks: Boolean[] = [];

    for (let i = 0; i <= 47; i++) {
      newTimeBlocks.push(false);
    }

    pickedTimes.forEach(({ key, times }: pickedTimesType) => {
      const startNum = times[0].hour() * 2 + (times[0].minute() ? 1 : 0);
      const endNum = times[1].hour() * 2 + (times[1].minute() ? 1 : 0);

      for (let i = startNum; i < endNum; i++) {
        newTimeBlocks[i] = true;
      }
    });

    setTimeBlocks(newTimeBlocks);
  }, [pickedTimes]);

  return (
    <section className={styles.timeResultContainer}>
      <h2>Time Result</h2>
      {timeBlocks.map((blockBool: Boolean) => (
        <div
          className={
            blockBool ? styles.timeBlockColored : styles.timeBlockGlass
          }
        ></div>
      ))}
    </section>
  );
}

export default TimeResultContainer;
