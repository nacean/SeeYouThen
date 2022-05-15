import { atom } from 'recoil';

export interface clickedTimeBlockType {
  row: number;
  col: number;
}

const mouseOverTimeBlockState = atom<clickedTimeBlockType>({
  key: 'mouseOverTimeBlockState',
  default: null,
});

export default mouseOverTimeBlockState;
