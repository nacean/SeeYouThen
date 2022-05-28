import { Switch } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import switchAllSelectValueState from '../../../atoms/roomOptionAtoms/switchAllSelectValueState';
import styles from './SwitchAllSelect.module.scss';

function SwitchAllSelect() {
  const [switchAllSelectValue, setSwitchAllSelectValue] = useRecoilState(
    switchAllSelectValueState,
  );
  const onChangeSwitch = () => {
    setSwitchAllSelectValue(!switchAllSelectValue);
  };

  return (
    <div className={styles.optionContainer}>
      <p>모든 유저가 가능한 날만 보기</p>
      <Switch
        defaultChecked
        checked={switchAllSelectValue}
        onChange={onChangeSwitch}
      />
    </div>
  );
}

export default SwitchAllSelect;
