import React from 'react';
import { Button, DatePicker, Popconfirm } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import datePickState from '../../../atoms/timeAtoms/datePickState';
import { Moment } from 'moment';
import timeBlockState, {
  timeBlockType,
} from '../../../atoms/timeAtoms/timeBlockState';
import getBlankTimeBlock from '../../../modules/timeModules/getBlankTimeBlock';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import addRoomInfo from '../../../modules/dbModules/addRoomInfo';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';
import styles from './DatePickForm.module.scss';
const { RangePicker } = DatePicker;

function DatePickForm() {
  const [pickedDates, setPickedDates] =
    useRecoilState<(Moment | null)[]>(datePickState);
  const setTimeBlocks = useSetRecoilState(timeBlockState);
  const roomId = useRecoilValue(roomIdState);
  const roomName = useRecoilValue(roomNameState);
  const roomUsers = useRecoilValue(roomUsersState);

  const onDatePickChange = (timeParam: (Moment | null)[] | null) => {
    setPickedDates(timeParam);
  };

  const onDataChangeConfirm = () => {
    if (pickedDates === null) {
      setTimeBlocks([]);
      setPickedDates([null, null]);
      return;
    }

    if (pickedDates[0] === null || pickedDates[1] === null) {
      setTimeBlocks([]);
      setPickedDates([null, null]);
      return;
    }

    let startDate: Moment | null = pickedDates[0].clone();
    const endDate: Moment | null = pickedDates[1].clone();

    const newTimeBlock: timeBlockType[] = [];

    let tempCol: number = 0;
    while (1) {
      const tempBlock: timeBlockType = {
        date: startDate.format('MM-DD'),
        col: tempCol++,
        blocks: getBlankTimeBlock(),
      };

      newTimeBlock.push(tempBlock);

      if (startDate.format('MM-DD') === endDate.format('MM-DD')) break;

      startDate = startDate.add(1, 'days');
    }
    setTimeBlocks(newTimeBlock);
    addRoomInfo({
      pickedDates,
      timeBlocks: newTimeBlock,
      roomUsers,
      roomId,
      roomName,
    });
  };

  return (
    <div className={styles.chooseDate}>
      <RangePicker
        value={pickedDates ? [pickedDates[0], pickedDates[1]] : null}
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
