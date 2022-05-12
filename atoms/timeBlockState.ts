import { atom } from 'recoil';

const timeArray: Boolean[] = [];

for (let i = 0; i <= 47; i++) {
  timeArray.push(false);
}

const timeBlockState = atom<Boolean[]>({
  key: 'timeBlockState',
  default: timeArray,
});

export default timeBlockState;
