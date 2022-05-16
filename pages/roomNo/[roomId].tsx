import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DatePickContainer from '../../components/home/datePick/DatePickContainer';
import TimeResultContainer from '../../components/home/timeResult/TimeResultContainer';
import styles from './roomId.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const { roomName } = router.query;
  return (
    <article className={styles.homeContainer}>
      <h2>{roomName}</h2>
      <div className={styles.timeMainContainer}>
        <DatePickContainer />
        <TimeResultContainer />
      </div>
    </article>
  );
};

export default Home;
