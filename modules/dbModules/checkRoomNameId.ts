import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../fireStore/fireStoreApp';

async function checkRoomNameId(roomNameParam: string, roomIdParam: string) {
  const roomRef = doc(db, 'roomDB', roomIdParam);
  const roomSnapShot = await getDoc(roomRef);

  if (roomSnapShot.exists()) {
    const { roomName } = roomSnapShot.data();
    if (roomName === roomNameParam) return true;

    return false;
  } else {
    return true;
  }
}

export default checkRoomNameId;
