import { atom } from 'recoil';

const nowPickUserState = atom<string>({
  key: 'nowPickUserState',
  default: null,
});

export default nowPickUserState;
