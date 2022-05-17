import { atom } from 'recoil';

const addingRoomUserState = atom<string>({
  key: 'addingRoomUserState',
  default: null,
});

export default addingRoomUserState;
