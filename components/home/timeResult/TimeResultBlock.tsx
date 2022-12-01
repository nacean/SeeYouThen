import { Popover } from 'antd';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';
import switchAllSelectValueState from '../../../atoms/roomOptionAtoms/switchAllSelectValueState';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import clickedTimeBlockState from '../../../atoms/timeAtoms/clickedTimeBlockState';
import datePickState from '../../../atoms/timeAtoms/datePickState';
import mouseOverTimeBlockState from '../../../atoms/timeAtoms/mouseOverTimeBlockState';
import nowPickTimeState from '../../../atoms/timeAtoms/nowPickTimeState';
import timeBlockState, {
  blockType,
  timeBlockType,
} from '../../../atoms/timeAtoms/timeBlockState';
import addRoomInfo from '../../../modules/dbModules/addRoomInfo';
import getRowCol from '../../../modules/timeModules/getRowCol';
import styles from './timeResultBlock.module.scss';

interface TimeResultBlockType {
  row: number;
  col: number;
  colored: Boolean;
  allUserSelect: Boolean;
  blockUsingUsers: string[];
}

function TimeResultBlock({
  row,
  col,
  colored,
  allUserSelect,
  blockUsingUsers,
}: TimeResultBlockType) {
  const [clickedTimeBlock, setClickedTimeBlock] = useRecoilState(
    clickedTimeBlockState,
  );
  const [timeBlocks, setTimeBlocks] = useRecoilState(timeBlockState);
  const [mouseOverTimeBlock, setMouseOverTimeBlock] = useRecoilState(
    mouseOverTimeBlockState,
  );
  const nowPickUser = useRecoilValue(nowPickUserState);
  const roomUsers = useRecoilValue(roomUsersState);
  const pickedDates = useRecoilValue(datePickState);
  const pickedTimes = useRecoilValue(nowPickTimeState);
  const switchAllSelectValue = useRecoilValue(switchAllSelectValueState);
  const roomName = useRecoilValue(roomNameState);
  const roomId = useRecoilValue(roomIdState);

  const userPutInOrNot = (rowBlockParam: blockType): string[] => {
    const nowUserIn = rowBlockParam.usingUsers.indexOf(nowPickUser) !== -1;

    if (clickedTimeBlock.clickIsColored) {
      return nowUserIn
        ? rowBlockParam.usingUsers.filter(
            (userParam: string) => userParam !== nowPickUser,
          )
        : rowBlockParam.usingUsers;
    } else {
      return nowUserIn
        ? rowBlockParam.usingUsers
        : [...rowBlockParam.usingUsers, nowPickUser];
    }
  };

  const onClickTimeBlock = async () => {
    if (nowPickUser === null) {
      alert('유저를 먼저 선택해주세요');
      return;
    }
    if (!clickedTimeBlock) {
      setClickedTimeBlock({ row, col, clickIsColored: colored });
      return;
    }

    const { left, right, up, down } = getRowCol(
      col,
      clickedTimeBlock.col,
      row,
      clickedTimeBlock.row,
    );

    const newTimeBlocks: timeBlockType[] = timeBlocks.map((colBlockParam) => {
      if (colBlockParam.col >= left && colBlockParam.col <= right) {
        const newRowBlock = colBlockParam.blocks.map(
          (rowBlockParam: blockType) => {
            if (rowBlockParam.row >= up && rowBlockParam.row <= down) {
              return {
                ...rowBlockParam,
                usingUsers: userPutInOrNot(rowBlockParam),
              };
            } else {
              return rowBlockParam;
            }
          },
        );

        return {
          ...colBlockParam,
          blocks: newRowBlock,
        };
      } else {
        return colBlockParam;
      }
    });

    setTimeBlocks(newTimeBlocks);
    addRoomInfo({
      pickedDates,
      pickedTimes,
      timeBlocks: newTimeBlocks,
      roomUsers,
      roomId,
      roomName,
    });
    setClickedTimeBlock(null);
    setMouseOverTimeBlock(null);
  };

  const onMouseOverTimeBlock = () => {
    if (!clickedTimeBlock) return;
    else setMouseOverTimeBlock({ row, col });
  };

  const checkBlockShouldColored = () => {
    if (!clickedTimeBlock || !mouseOverTimeBlock) return false;

    const { left, right, up, down } = getRowCol(
      mouseOverTimeBlock.col,
      clickedTimeBlock.col,
      mouseOverTimeBlock.row,
      clickedTimeBlock.row,
    );

    if (left <= col && col <= right && up <= row && row <= down) return true;

    return false;
  };

  const blockColor = () => {
    if (checkBlockShouldColored()) return styles.timeBlockSelected;
    else if (allUserSelect) return styles.timeBlockAllUserSelect;
    else if (colored && !switchAllSelectValue) return styles.timeBlockColored;
    else return styles.timeBlockGlass;
  };

  const popOverUserList = () => {
    return (
      <ul>
        {blockUsingUsers.map((userParam) => (
          <li key={userParam}>{userParam}</li>
        ))}
      </ul>
    );
  };

  return (
    <Popover content={popOverUserList} placement="leftBottom">
      <div
        className={`${blockColor()} ${
          row % 2 == 0 ? styles.oclock : styles.minute30
        }`}
        onClick={onClickTimeBlock}
        onMouseOver={onMouseOverTimeBlock}
      ></div>
    </Popover>
  );
}

export default TimeResultBlock;
