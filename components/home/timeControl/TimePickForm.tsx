import React from 'react';
import { Button, TimePicker } from 'antd';
import { useRecoilState } from 'recoil';
import nowPickTimeState from '../../../atoms/timeAtoms/nowPickTimeState';
import pickedTimesState from '../../../atoms/timeAtoms/pickedTimesState';
import { v4 as uuidv4 } from 'uuid';
import timeBlockState from '../../../atoms/timeAtoms/timeBlockState';
function TimePickForm() {
  const [nowPickTime, setNowPickTime] = useRecoilState(nowPickTimeState);
  const [pickedTimes, setPickedTimes] = useRecoilState(pickedTimesState);

  const onTimeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTime = {
      key: uuidv4(),
      times: nowPickTime,
    };

    setPickedTimes([...pickedTimes, newTime]);
    setNowPickTime([null, null]);
  };

  return (
    <form onSubmit={onTimeSubmit}>
      <TimePicker.RangePicker
        onChange={(times) => {
          if (times !== null) setNowPickTime([times[0], times[1]]);
        }}
        format="HH:mm"
        minuteStep={30}
        value={[nowPickTime[0], nowPickTime[1]]}
      />
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </form>
  );
}

export default TimePickForm;
