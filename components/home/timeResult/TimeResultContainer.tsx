import React from 'react';
import { useRecoilValue } from 'recoil';
import timeBlockState, {
  blockType,
  timeBlockType,
} from '../../../atoms/timeBlockState';
import TimeResultBlock from './TimeResultBlock';
import styles from './TimeResultContainer.module.scss';
function TimeResultContainer() {
  const timeBlocks = useRecoilValue(timeBlockState);

  console.log(timeBlocks);
  return (
    <section className={styles.timeResultContainer}>
      <h2>Time Result</h2>
      <div className={styles.timePerDateBox}>
        {timeBlocks.map((timeBlockParam: timeBlockType) => {
          return (
            <div key={timeBlockParam.date} className={styles.timeBlock}>
              <h3>{timeBlockParam.date}</h3>
              {timeBlockParam.blocks.map((blockParam: blockType) => {
                return (
                  <TimeResultBlock
                    row={blockParam.row}
                    col={timeBlockParam.col}
                    colored={blockParam.colored}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TimeResultContainer;
