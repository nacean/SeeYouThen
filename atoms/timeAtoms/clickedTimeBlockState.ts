import { atom } from 'recoil';

export interface clickedTimeBlockType {
  row: number;
  col: number;
  clickIsColored: Boolean;
}

const clickedTimeBlockState = atom<clickedTimeBlockType>({
  key: 'clickedTimeBlockState',
  default: null,
});

export default clickedTimeBlockState;
