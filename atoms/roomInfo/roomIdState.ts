import { atom } from 'recoil';

const roomIdState = atom<string>({
  key: 'roomIdState',
  default: null,
});

export default roomIdState;
