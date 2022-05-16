import React from 'react';
import { Button, DatePicker, Popconfirm } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import datePickState from '../../../atoms/datePickState';
import { Moment } from 'moment';
import timeBlockState, { timeBlockType } from '../../../atoms/timeBlockState';
import getBlankTimeBlock from '../../../modules/timeModules/getBlankTimeBlock';
const { RangePicker } = DatePicker;

function DatePickForm() {
  const [datePick, setDatePick] =
    useRecoilState<(Moment | null)[]>(datePickState);
  const setTimeBlock = useSetRecoilState(timeBlockState);

  const onDatePickChange = (timeParam: (Moment | null)[] | null) => {
    setDatePick(timeParam);
  };

  const onDataChangeConfirm = () => {
    if (datePick === null) {
      setTimeBlock([]);
      setDatePick([null, null]);
      return;
    }

    if (datePick[0] === null || datePick[1] === null) {
      setTimeBlock([]);
      setDatePick([null, null]);
      return;
    }
    let startDate: Moment | null = datePick[0];
    const endDate: Moment | null = datePick[1];

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
  };

  return (
    <div>
      <RangePicker
        value={datePick ? [datePick[0], datePick[1]] : null}
        onCalendarChange={onDatePickChange}
        placement="topRight"
      />
      <Popconfirm
        title="날짜변경 시 데이터가 초기화 됩니다. 하시겠습니까?"
        onConfirm={onDataChangeConfirm}
        okText="변경"
        cancelText="취소"
      >
        <Button type="primary">날짜변경</Button>
      </Popconfirm>
    </div>
  );
}

export default DatePickForm;
