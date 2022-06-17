import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Popconfirm, TimePicker } from 'antd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import datePickState from '../../../atoms/timeAtoms/datePickState';
import moment, { Moment } from 'moment';
import timeBlockState, {
  timeBlockType,
} from '../../../atoms/timeAtoms/timeBlockState';
import getBlankTimeBlock from '../../../modules/timeModules/getBlankTimeBlock';
import roomIdState from '../../../atoms/roomInfo/roomIdState';
import addRoomInfo from '../../../modules/dbModules/addRoomInfo';
import roomUsersState from '../../../atoms/roomUserAtoms/roomUsersState';
import roomNameState from '../../../atoms/roomInfo/roomNameState';
import styles from './DatePickForm.module.scss';
import nowPickTimeState from '../../../atoms/timeAtoms/nowPickTimeState';
const { RangePicker } = DatePicker;

function DatePickForm() {
  const [pickedDates, setPickedDates] =
    useRecoilState<(Moment | null)[]>(datePickState);
  const [pickedTimes, setPickedTimes] =
    useRecoilState<(Moment | null)[]>(nowPickTimeState);
  const setTimeBlocks = useSetRecoilState(timeBlockState);
  const roomId = useRecoilValue(roomIdState);
  const roomName = useRecoilValue(roomNameState);
  const roomUsers = useRecoilValue(roomUsersState);
  const [tempTimes, setTempTimes] = useState<(null | Moment)[]>([null, null]);

  useEffect(() => {
    setTempTimes(pickedTimes);
  }, [pickedTimes]);

  const onDatePickChange = (dateParam: (Moment | null)[] | null) => {
    setPickedDates(dateParam);
  };

  const onTimePickChange = (timeParam: (Moment | null)[] | null) => {
    setTempTimes(timeParam);
  };

  const onDataChangeConfirm = () => {
    if (pickedDates === null || tempTimes === null) {
      alert('날짜와 시간 설정이 필요합니다.');
      return;
    }

    if (
      pickedDates[0] === null ||
      pickedDates[1] === null ||
      tempTimes[0] === null ||
      tempTimes[1] === null
    ) {
      alert('날짜와 시간 설정이 필요합니다.');
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
        blocks: getBlankTimeBlock(tempTimes[0].clone(), tempTimes[1].clone()),
      };

      newTimeBlock.push(tempBlock);

      if (startDate.format('MM-DD') === endDate.format('MM-DD')) break;

      startDate = startDate.add(1, 'days');
    }
    setTimeBlocks(newTimeBlock);
    setPickedTimes(tempTimes);
    addRoomInfo({
      pickedDates,
      pickedTimes: tempTimes,
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
      <TimePicker.RangePicker
        value={[tempTimes[0], tempTimes[1]]}
        placement="bottomRight"
        minuteStep={30}
        format="HH:mm"
        onChange={onTimePickChange}
      />
      <Popconfirm
        title="날짜변경 시 데이터가 초기화 됩니다. 하시겠습니까?"
        onConfirm={onDataChangeConfirm}
        okText="변경"
        cancelText="취소"
      >
        <Button type="primary">변경</Button>
      </Popconfirm>
    </div>
  );
}

export default DatePickForm;
