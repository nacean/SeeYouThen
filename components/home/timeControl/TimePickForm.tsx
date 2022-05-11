import React from 'react';
import { Button, TimePicker } from 'antd';
import { useRecoilState } from 'recoil';
import nowPickTimeState from '../../../atoms/nowPickTimeState';
import pickedTimesState from '../../../atoms/pickedTimesState';
import { v4 as uuidv4 } from 'uuid';
function TimePickForm() {
  const [nowPickTime, setNowPickTime] = useRecoilState(nowPickTimeState);
  const [pickedTimes, setPickedTimes] = useRecoilState(pickedTimesState);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newTime = {
          key: uuidv4(),
          times: nowPickTime,
        };

        setPickedTimes([...pickedTimes, newTime]);
        setNowPickTime([null, null]);
      }}
    >
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
