import { setDoc, doc } from 'firebase/firestore/lite';
import { timeBlockType } from '../../atoms/timeAtoms/timeBlockState';
import { db } from '../../fireStore/fireStoreApp';

interface addRoomInfoType {
  pickedDates: moment.Moment[];
  timeBlocks: timeBlockType[];
  roomUsers: string[];
  roomId: string | string[];
  roomName: string | string[];
}

async function addRoomInfo({
  pickedDates,
  timeBlocks,
  roomUsers,
  roomId,
  roomName,
}: addRoomInfoType) {
  await setDoc(doc(db, 'roomDB', roomId as string), {
    roomName: roomName as string,
    pickedDates: [
      pickedDates[0].format('YYYY-MM-DD'),
      pickedDates[1].format('YYYY-MM-DD'),
    ],
    resultBlocks: timeBlocks,
    roomUsers: roomUsers,
  });
}

export default addRoomInfo;
