import { Moment } from 'moment';
import { blockType } from '../../atoms/timeAtoms/timeBlockState';

function getBlankTimeBlock(startTime: Moment, endTime: Moment): blockType[] {
  const timeArray: blockType[] = [];
  let rowNum = 0;

  while (endTime.format('hh:mm') !== startTime.format('hh:mm')) {
    timeArray.push({ row: rowNum++, usingUsers: [] });
    startTime.add(30, 'm');
  }

  return timeArray;
}

export default getBlankTimeBlock;
