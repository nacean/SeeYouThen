import { blockType } from '../../atoms/timeBlockState';

function getBlankTimeBlock(): blockType[] {
  const timeArray: blockType[] = [];

  for (let i = 0; i <= 46; i++) {
    timeArray.push({ row: i, colored: false });
  }
  return timeArray;
}

export default getBlankTimeBlock;
