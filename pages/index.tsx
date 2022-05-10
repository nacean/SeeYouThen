import type { NextPage } from 'next';
import styles from './Home.module.scss';

const Home: NextPage = () => {
  return (
    <article className={styles.homeContainer}>
      <section>
        <h2>Add/Edit/Delete</h2>
      </section>
      <section>
        <h2>Time Result</h2>
      </section>
    </article>
  );
};

export default Home;
