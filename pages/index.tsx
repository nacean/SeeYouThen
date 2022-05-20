import type { NextPage } from 'next';
import styles from './Home.module.scss';

const Home: NextPage = () => {
  return (
    <article className={styles.homeContainer}>
      <h2 className={styles.serviceName}>See You Then</h2>
      <p className={styles.serviceDescription}>
        When we meet ? Ok, see you then!!
      </p>
    </article>
  );
};

export default Home;
