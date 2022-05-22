import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DatePickContainer from '../../components/home/datePick/DatePickContainer';
import TimeResultContainer from '../../components/home/timeResult/TimeResultContainer';
import styles from './roomId.module.scss';
import RoomTitleAndCopy from '../../components/home/roomHead/roomTitleAndCopy';

const roomPage: NextPage = () => {
  const router = useRouter();
  const { roomName, roomId } = router.query;
  return (
    <article className={styles.homeContainer}>
      <RoomTitleAndCopy roomName={roomName} roomId={roomId} />
      <div className={styles.timeMainContainer}>
        <DatePickContainer />
        <TimeResultContainer />
      </div>
    </article>
  );
};

export default roomPage;
