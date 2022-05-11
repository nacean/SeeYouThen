import moment, { Moment } from 'moment';
import { atom } from 'recoil';

const nowPickTimeState = atom<(Moment | null)[]>({
  key: 'nowPickTimeState',
  default: [null, null],
});

export default nowPickTimeState;
