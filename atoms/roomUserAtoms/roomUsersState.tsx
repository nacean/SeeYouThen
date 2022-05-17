import { atom } from 'recoil';

const roomUsersState = atom<string[]>({
  key: 'roomUsersState',
  default: [],
});

export default roomUsersState;
