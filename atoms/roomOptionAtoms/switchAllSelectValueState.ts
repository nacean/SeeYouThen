import { atom } from 'recoil';

const switchAllSelectValueState = atom<boolean>({
  key: 'switchAllSelectValueState',
  default: false,
});

export default switchAllSelectValueState;
