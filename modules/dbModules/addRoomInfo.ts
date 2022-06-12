import { setDoc, doc } from 'firebase/firestore/lite';
import moment from 'moment';
import { timeBlockType } from '../../atoms/timeAtoms/timeBlockState';
import { db } from '../../fireStore/fireStoreApp';

interface addRoomInfoType {
  pickedDates: moment.Moment[];
  pickedTimes: moment.Moment[];
  timeBlocks: timeBlockType[];
  roomUsers: string[];
  roomId: string | string[];
  roomName: string | string[];
}

async function addRoomInfo({
  pickedDates,
  pickedTimes,
  timeBlocks,
  roomUsers,
  roomId,
  roomName,
}: addRoomInfoType) {
  const newPickedDates =
    pickedDates[0] === null || pickedDates[1] === null
      ? [null, null]
      : [
          pickedDates[0].format('YYYY-MM-DD'),
          pickedDates[1].format('YYYY-MM-DD'),
        ];
  const newPickedTimes =
    pickedTimes[0] === null || pickedTimes[1] === null
      ? [null, null]
      : [pickedTimes[0].format('hh:mm'), pickedTimes[1].format('hh:mm')];
  await setDoc(doc(db, 'roomDB', roomId as string), {
    roomName: roomName as string,
    pickedDates: newPickedDates,
    pickedTimes: newPickedTimes,
    resultBlocks: timeBlocks,
    roomUsers: roomUsers,
  });
}

export default addRoomInfo;
