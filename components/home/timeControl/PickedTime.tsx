import { Button, TimePicker } from 'antd';
import { Moment } from 'moment';
import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import pickedTimesState, {
  pickedTimesType,
} from '../../../atoms/pickedTimesState';
import styles from './PickedTime.module.scss';

interface timeType {
  pickedTime: pickedTimesType;
}

function PickedTime({ pickedTime }: timeType) {
  const [pickedTimes, setPickedTimes] = useRecoilState(pickedTimesState);
  const [startTime, setStartTime] = useState<Moment>(pickedTime.times[0]);
  const [endTime, setEndTime] = useState<Moment>(pickedTime.times[1]);
  const [showEdit, setShowEdit] = useState<Boolean>(false);

  const onDeleteTimeButtonClick = () => {
    const filteredPickedTimes: pickedTimesType[] = pickedTimes.filter(
      ({ key }) => key !== pickedTime.key,
    );

    setPickedTimes(filteredPickedTimes);
  };

  const onEditTimeButtonClick = () => {
    setShowEdit(!showEdit);
  };

  const onChangeEditTimes = (e: (Moment | null)[] | null) => {
    setStartTime(e[0]);
    setEndTime(e[1]);
    const editTime = {
      key: pickedTime.key,
      times: [e[0], e[1]],
    };
    const editedPickedTimes = pickedTimes.map(
      (tempPickedTime: pickedTimesType) =>
        tempPickedTime.key === pickedTime.key ? editTime : tempPickedTime,
    );
    setPickedTimes(editedPickedTimes);
  };

  return (
    <>
      <div className={styles.pickedTime}>
        <p>{`[Start : ${startTime?.hour()}:${
          startTime?.minute() ? startTime?.minute() : '00'
        }]`}</p>
        <p>{`[End : ${endTime?.hour()}:${
          endTime?.minute() ? endTime?.minute() : '00'
        }]`}</p>

        <Button type="primary" onClick={onEditTimeButtonClick}>
          수정
        </Button>
        <Button type="primary" danger onClick={onDeleteTimeButtonClick}>
          삭제
        </Button>
      </div>
      <div>
        {showEdit && (
          <TimePicker.RangePicker
            value={[startTime, endTime]}
            onChange={onChangeEditTimes}
            format="HH:mm"
            minuteStep={30}
          />
        )}
      </div>
    </>
  );
}

export default PickedTime;
