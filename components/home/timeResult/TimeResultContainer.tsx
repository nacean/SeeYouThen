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
import TimeLine from './TimeLine';
import TimeResultBlock from './TimeResultBlock';
import styles from './TimeResultContainer.module.scss';

function TimeResultContainer() {
  const timeBlocks = useRecoilValue(timeBlockState);
  const nowPickUser = useRecoilValue(nowPickUserState);
  const roomUsers = useRecoilValue(roomUsersState);
  const roomId = useRecoilValue(roomIdState);

  return (
    <section className={styles.timeResultContainer}>
      <SwitchAllSelect />
      <div className={styles.timeLineAndBlocks}>
        <TimeLine />
        <div className={styles.alltimeBlocks}>
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
                      colored={
                        blockParam.usingUsers.indexOf(nowPickUser) !== -1
                      }
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
      </div>
    </section>
  );
}

export default TimeResultContainer;
