import React from 'react';
import { DatePicker } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import datePickState from '../../../atoms/datePickState';
import { Moment } from 'moment';
import timeBlockState, { timeBlockType } from '../../../atoms/timeBlockState';
import getBlankTimeBlock from '../../../modules/timeModules/getBlankTimeBlock';
const { RangePicker } = DatePicker;

function DatePick() {
  const [datePick, setDatePick] =
    useRecoilState<(Moment | null)[]>(datePickState);
  const setTimeBlock = useSetRecoilState(timeBlockState);

  const onDatePickChange = (timeParam: (Moment | null)[] | null) => {
    if (timeParam === null) {
      setTimeBlock([]);
      setDatePick([null, null]);
      return;
    }

    if (timeParam[0] === null || timeParam[1] === null) {
      setTimeBlock([]);
      setDatePick([null, null]);
      return;
    }
    let startDate: Moment | null = timeParam[0];
    const endDate: Moment | null = timeParam[1];

    const newTimeBlock: timeBlockType[] = [];

    let tempCol: number = 0;
    while (1) {
      console.log(startDate);
      const tempBlock: timeBlockType = {
        date: startDate.format('MM-DD'),
        col: tempCol++,
        blocks: getBlankTimeBlock(),
      };

      newTimeBlock.push(tempBlock);

      if (startDate.format('MM-DD') === endDate.format('MM-DD')) break;

      startDate = startDate.add(1, 'days');
    }
    setTimeBlock(newTimeBlock);
    setDatePick(timeParam);
  };
  return (
    <RangePicker
      value={[datePick[0], datePick[1]]}
      onChange={onDatePickChange}
    />
  );
}

export default DatePick;
