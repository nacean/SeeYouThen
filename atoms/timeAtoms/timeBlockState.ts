import { Moment } from 'moment';
import { atom } from 'recoil';

export interface blockType {
  row: number;
  usingUsers: string[];
}

export interface timeBlockType {
  date: string;
  col: number;
  blocks: blockType[];
}

const timeBlockState = atom<timeBlockType[]>({
  key: 'timeBlockState',
  default: [],
});

export default timeBlockState;
