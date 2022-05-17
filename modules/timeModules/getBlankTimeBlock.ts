import { blockType } from '../../atoms/timeAtoms/timeBlockState';

function getBlankTimeBlock(): blockType[] {
  const timeArray: blockType[] = [];

  for (let i = 0; i <= 47; i++) {
    timeArray.push({ row: i, usingUsers: [] });
  }
  return timeArray;
}

export default getBlankTimeBlock;
