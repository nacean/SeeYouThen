import { Divider } from 'antd';
import type { NextPage } from 'next';
import BlockClickManual from '../components/manual/BlockClickManual';
import PickDateManual from '../components/manual/PickDateManual';
import RoomMakeManual from '../components/manual/RoomMakeManual';
import styles from './ManualPage.module.scss';

const ManualPage: NextPage = () => {
  return (
    <article className={styles.manualContainer}>
      <h2>Manual</h2>
      <RoomMakeManual />
      <Divider />
      <PickDateManual />
      <Divider />
      <BlockClickManual />
    </article>
  );
};

export default ManualPage;
