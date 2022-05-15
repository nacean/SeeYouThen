import type { NextPage } from 'next';
import DatePick from '../components/home/datePick/DatePick';
import TimeControlContainer from '../components/home/timeControl/TimeControlContainer';
import TimeResultContainer from '../components/home/timeResult/TimeResultContainer';
import styles from './Home.module.scss';

const Home: NextPage = () => {
  return (
    <article className={styles.homeContainer}>
      <DatePick />
      <TimeResultContainer />
    </article>
  );
};

export default Home;
