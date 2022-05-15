import React from 'react';
import { useRecoilState } from 'recoil';
import clickedTimeBlockState from '../../../atoms/clickedTimeBlockState';
import mouseOverTimeBlockState from '../../../atoms/mouseOverTimeBlockState';
import timeBlockState, { timeBlockType } from '../../../atoms/timeBlockState';
import styles from './timeResultBlock.module.scss';

interface TimeResultBlockType {
  row: number;
  col: number;
  colored: Boolean;
}

function TimeResultBlock({ row, col, colored }: TimeResultBlockType) {
  const [clickedTimeBlock, setClickedTimeBlock] = useRecoilState(
    clickedTimeBlockState,
  );
  const [timeBlocks, setTimeBlocks] = useRecoilState(timeBlockState);
  const [mouseOverTimeBlock, setMouseOverTimeBlock] = useRecoilState(
    mouseOverTimeBlockState,
  );
  const onClickTimeBlock = () => {
    if (!clickedTimeBlock) {
      setClickedTimeBlock({ row, col, clickIsColored: colored });
      return;
    }

    const left: number =
      col < clickedTimeBlock.col ? col : clickedTimeBlock.col;
    const right: number =
      col > clickedTimeBlock.col ? col : clickedTimeBlock.col;
    const up: number = row < clickedTimeBlock.row ? row : clickedTimeBlock.row;
    const down: number =
      row > clickedTimeBlock.row ? row : clickedTimeBlock.row;

    const newTimeBlocks: timeBlockType[] = timeBlocks.map((colBlockParam) => {
      if (colBlockParam.col >= left && colBlockParam.col <= right) {
        const newRowBlock = colBlockParam.blocks.map((rowBlockParam) => {
          if (rowBlockParam.row >= up && rowBlockParam.row <= down) {
            return {
              ...rowBlockParam,
              colored: clickedTimeBlock.clickIsColored ? false : true,
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

    const left: number =
      mouseOverTimeBlock.col < clickedTimeBlock.col
        ? mouseOverTimeBlock.col
        : clickedTimeBlock.col;
    const right: number =
      mouseOverTimeBlock.col > clickedTimeBlock.col
        ? mouseOverTimeBlock.col
        : clickedTimeBlock.col;
    const up: number =
      mouseOverTimeBlock.row < clickedTimeBlock.row
        ? mouseOverTimeBlock.row
        : clickedTimeBlock.row;
    const down: number =
      mouseOverTimeBlock.row > clickedTimeBlock.row
        ? mouseOverTimeBlock.row
        : clickedTimeBlock.row;

    if (left <= col && col <= right && up <= row && row <= down) return true;

    return false;
  };

  const blockColor = () => {
    if (checkBlockShouldColored()) return styles.timeBlockSelected;
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
