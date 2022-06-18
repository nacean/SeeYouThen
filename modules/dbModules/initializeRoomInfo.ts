import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../fireStore/fireStoreApp';

async function initializeRoomInfo(roomId: string) {
  const roomRef = doc(db, 'roomDB', roomId);
  const roomSnapShot = await getDoc(roomRef);

  if (roomSnapShot.exists()) {
    return roomSnapShot.data();
  } else {
    return null;
  }
}

export default initializeRoomInfo;
