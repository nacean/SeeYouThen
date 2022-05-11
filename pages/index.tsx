import type { NextPage } from 'next';
import TimeControlContainer from '../components/home/timeControl/TimeControlContainer';
import TimeResultContainer from '../components/home/timeResult/TimeResultContainer';
import styles from './Home.module.scss';

const Home: NextPage = () => {
  return (
    <article className={styles.homeContainer}>
      <TimeControlContainer />
      <TimeResultContainer />
    </article>
  );
};

export default Home;
