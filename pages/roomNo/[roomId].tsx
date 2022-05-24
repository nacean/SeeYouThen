import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DatePickContainer from '../../components/home/datePick/DatePickContainer';
import TimeResultContainer from '../../components/home/timeResult/TimeResultContainer';
import styles from './roomId.module.scss';
import RoomTitleAndCopy from '../../components/home/roomHead/RoomTitleAndCopy';
import { useSetRecoilState } from 'recoil';
import roomNameState from '../../atoms/roomInfo/roomNameState';
import roomIdState from '../../atoms/roomInfo/roomIdState';
const roomPage: NextPage = () => {
  const setRoomName = useSetRecoilState(roomNameState);
  const setRoomId = useSetRecoilState(roomIdState);

  const router = useRouter();
  const { roomName, roomId } = router.query;

  setRoomName(roomName as string);
  setRoomId(roomId as string);
  return (
    <article className={styles.homeContainer}>
      <RoomTitleAndCopy roomName={roomName} roomId={roomId} />
      <div className={styles.timeMainContainer}>
        <DatePickContainer />
        <TimeResultContainer roomId={roomId} />
      </div>
    </article>
  );
};

export default roomPage;
