import { atom } from 'recoil';

export interface mouseOverTimeBlockStateType {
  row: number;
  col: number;
}

const mouseOverTimeBlockState = atom<mouseOverTimeBlockStateType>({
  key: 'mouseOverTimeBlockState',
  default: null,
});

export default mouseOverTimeBlockState;
