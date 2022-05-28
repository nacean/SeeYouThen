import moment from 'moment';
import React from 'react';
import { useRecoilValue } from 'recoil';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import timeBlockState, {
  blockType,
  timeBlockType,
} from '../../../atoms/timeAtoms/timeBlockState';
import SwitchAllSelect from './SwitchAllSelect';
import TimeResultBlock from './TimeResultBlock';
import styles from './TimeResultContainer.module.scss';

function TimeResultContainer() {
  const timeBlocks = useRecoilValue(timeBlockState);
  const nowPickUser = useRecoilValue(nowPickUserState);
  const roomUsers = useRecoilValue(roomUsersState);
  const roomId = useRecoilValue(roomIdState);

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

  return (
    <section className={styles.timeResultContainer}>
      <SwitchAllSelect />
      <div className={styles.timePerDateBox}>
        <ul>{makeTimeLine()}</ul>
        {timeBlocks.map((timeBlockParam: timeBlockType) => {
          return (
            <div key={timeBlockParam.date} className={styles.timeBlock}>
              <h3>{timeBlockParam.date}</h3>
              {timeBlockParam.blocks.map((blockParam: blockType) => {
                return (
                  <TimeResultBlock
                    key={`${blockParam.row}${timeBlockParam.col}`}
                    row={blockParam.row}
                    col={timeBlockParam.col}
                    colored={blockParam.usingUsers.indexOf(nowPickUser) !== -1}
                    allUserSelect={
                      roomUsers.length !== 0 &&
                      roomUsers.length === blockParam.usingUsers.length
                    }
                    blockUsingUsers={blockParam.usingUsers}
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
