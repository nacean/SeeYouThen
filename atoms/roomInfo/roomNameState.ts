import { atom } from 'recoil';

const roomNameState = atom<string>({
  key: 'roomNameState',
  default: null,
});

export default roomNameState;
