import type { NextPage } from 'next';
import DatePickContainer from '../components/home/datePick/DatePickContainer';
import TimeResultContainer from '../components/home/timeResult/TimeResultContainer';
import styles from './Home.module.scss';

const Home: NextPage = () => {
  return (
    <article className={styles.homeContainer}>
      <DatePickContainer />
      <TimeResultContainer />
    </article>
  );
};

export default Home;
