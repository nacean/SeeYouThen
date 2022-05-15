import { Moment } from 'moment';
import { atom } from 'recoil';

const datePickState = atom<(Moment | null)[]>({
  key: 'datePickState',
  default: [null, null],
});

export default datePickState;
