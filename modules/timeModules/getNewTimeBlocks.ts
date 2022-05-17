import { clickedTimeBlockType } from '../../atoms/timeAtoms/clickedTimeBlockState';
import { timeBlockType } from '../../atoms/timeAtoms/timeBlockState';

interface getNewTimeBlocksType {
  timeBlocks: timeBlockType[];
  clickedTimeBlock: clickedTimeBlockType;
  left: number;
  right: number;
  up: number;
  down: number;
}

function getNewTimeBlocks({
  timeBlocks,
  clickedTimeBlock,
  left,
  right,
  up,
  down,
}: getNewTimeBlocksType) {
  timeBlocks.map((colBlockParam) => {
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
}

export default getNewTimeBlocks;
