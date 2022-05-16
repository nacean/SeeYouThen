import moment, { Moment } from 'moment';
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

  const makeTimeLine = () => {
    const timeLines: string[] = [];
    timeLines.push('time');
    for (let i = 0; i <= 48; i++) {
      timeLines.push(
        moment('00:00', 'HH:mm')
          .add(i * 30, 'minutes')
          .format('HH:mm'),
      );
    }
    return timeLines.map((timeLineParam: string) => (
      <li className={styles.timeLineList}>{timeLineParam}</li>
    ));
  };

  return (
    <section className={styles.timeResultContainer}>
      <div className={styles.timePerDateBox}>
        <ul>{makeTimeLine()}</ul>
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
