import { Moment } from 'moment';
import { atom } from 'recoil';

export interface pickedTimesType {
  key: string;
  times: (Moment | null)[];
}

const pickedTimesState = atom<pickedTimesType[]>({
  key: 'pickedTimesState',
  default: [],
});

export default pickedTimesState;
