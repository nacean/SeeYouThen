import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import DatePickContainer from '../../components/home/datePick/DatePickContainer';
import TimeResultContainer from '../../components/home/timeResult/TimeResultContainer';
import styles from './roomId.module.scss';
import RoomTitleAndCopy from '../../components/home/roomHead/RoomTitleAndCopy';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import roomNameState from '../../atoms/roomInfo/roomNameState';
import roomIdState from '../../atoms/roomInfo/roomIdState';
import initializeRoomInfo from '../../modules/dbModules/initializeRoomInfo';
import { DocumentData } from 'firebase/firestore/lite';
import { useEffect } from 'react';
import datePickState from '../../atoms/timeAtoms/datePickState';
import timeBlockState from '../../atoms/timeAtoms/timeBlockState';
import roomUsersState from '../../atoms/roomUserAtoms/roomUsersState';
import moment from 'moment';
import nowPickUserState from '../../atoms/roomUserAtoms/nowPickUserState';
import switchAllSelectValueState from '../../atoms/roomOptionAtoms/switchAllSelectValueState';
import checkRoomNameId from '../../modules/dbModules/checkRoomNameId';
import nowPickTimeState from '../../atoms/timeAtoms/nowPickTimeState';

const RoomPage: NextPage = () => {
  const setRoomName = useSetRecoilState(roomNameState);
  const setRoomId = useSetRecoilState(roomIdState);
  const setDatePick = useSetRecoilState(datePickState);
  const setTimeBlock = useSetRecoilState(timeBlockState);
  const setRoomUsers = useSetRecoilState(roomUsersState);
  const setPickedTimes = useSetRecoilState(nowPickTimeState);

  //resetState
  const resetUsers = useResetRecoilState(roomUsersState);
  const resetDates = useResetRecoilState(datePickState);
  const resetTimeBlocks = useResetRecoilState(timeBlockState);
  const resetNowPickUser = useResetRecoilState(nowPickUserState);
  const resetSwitchAllSelectValue = useResetRecoilState(
    switchAllSelectValueState,
  );
  const resetTimes = useResetRecoilState(nowPickTimeState);

  const router = useRouter();

  const getRoomInfo = async () => {
    const { roomName, roomId } = router.query;
    const initRoomInfo: DocumentData = await initializeRoomInfo(
      roomId as string,
    );

    if (initRoomInfo) {
      const { pickedDates, pickedTimes, resultBlocks, roomUsers } =
        initRoomInfo;
      setDatePick([moment(pickedDates[0]), moment(pickedDates[1])]);
      setPickedTimes([
        moment(pickedTimes[0], 'HH:mm'),
        moment(pickedTimes[1], 'HH:mm'),
      ]);
      setTimeBlock(resultBlocks);
      setRoomUsers(roomUsers);
    }
    setRoomName(roomName as string);
    setRoomId(roomId as string);
  };

  const roomCheck = async () => {
    const { roomName, roomId } = router.query;
    const roomIsValid = await checkRoomNameId(
      roomName as string,
      roomId as string,
    );

    if (!roomIsValid) {
      alert('잘못된 Url 접근입니다. Home으로 이동합니다.');
      router.push('/');
    }
  };

  useEffect(() => {
    if (router.isReady) {
      roomCheck();
      getRoomInfo();
    }

    return () => {
      resetUsers();
      resetDates();
      resetTimeBlocks();
      resetNowPickUser();
      resetSwitchAllSelectValue();
      resetTimes();
    };
  }, [router.isReady]);

  return (
    <article className={styles.homeContainer}>
      <RoomTitleAndCopy />
      <div className={styles.timeMainContainer}>
        <DatePickContainer />
        <TimeResultContainer />
      </div>
    </article>
  );
};

export default RoomPage;
