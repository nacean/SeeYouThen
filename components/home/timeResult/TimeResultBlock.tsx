import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import nowPickUserState from '../../../atoms/roomUserAtoms/nowPickUserState';
import clickedTimeBlockState from '../../../atoms/timeAtoms/clickedTimeBlockState';
import mouseOverTimeBlockState from '../../../atoms/timeAtoms/mouseOverTimeBlockState';
import timeBlockState, {
  timeBlockType,
} from '../../../atoms/timeAtoms/timeBlockState';
import getRowCol from '../../../modules/timeModules/getRowCol';
import styles from './timeResultBlock.module.scss';

interface TimeResultBlockType {
  row: number;
  col: number;
  colored: Boolean;
  allUserSelect: Boolean;
}

function TimeResultBlock({
  row,
  col,
  colored,
  allUserSelect,
}: TimeResultBlockType) {
  const [clickedTimeBlock, setClickedTimeBlock] = useRecoilState(
    clickedTimeBlockState,
  );
  const [timeBlocks, setTimeBlocks] = useRecoilState(timeBlockState);
  const [mouseOverTimeBlock, setMouseOverTimeBlock] = useRecoilState(
    mouseOverTimeBlockState,
  );
  const nowPickUser = useRecoilValue(nowPickUserState);

  const onClickTimeBlock = () => {
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
        const newRowBlock = colBlockParam.blocks.map((rowBlockParam) => {
          if (rowBlockParam.row >= up && rowBlockParam.row <= down) {
            return {
              ...rowBlockParam,
              usingUsers:
                rowBlockParam.usingUsers.indexOf(nowPickUser) !== -1
                  ? rowBlockParam.usingUsers.filter(
                      (userParam: string) => userParam !== nowPickUser,
                    )
                  : [...rowBlockParam.usingUsers, nowPickUser],
            };
          } else {
            return rowBlockParam;
          }
        });

        return {
          ...colBlockParam,
          blocks: newRowBlock,
        };
      } else {
        return colBlockParam;
      }
    });

    setTimeBlocks(newTimeBlocks);
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
    else if (colored) return styles.timeBlockColored;
    else return styles.timeBlockGlass;
  };

  return (
    <div
      className={blockColor()}
      onClick={onClickTimeBlock}
      onMouseOver={onMouseOverTimeBlock}
    ></div>
  );
}

export default TimeResultBlock;
