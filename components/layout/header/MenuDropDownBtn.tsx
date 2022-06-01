import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './MenuDropDownBtn.module.scss';

interface dropDownBtnType {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setDropMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuDropDownBtn({
  showMenu,
  setShowMenu,
  setDropMenu,
}: dropDownBtnType) {
  const toggleClick = () => {
    if (showMenu) {
      setDropMenu(false);
      setTimeout(() => {
        setShowMenu(false);
      }, 300);
    } else {
      setDropMenu(true);
      setShowMenu(true);
    }
  };

  return (
    <div className={styles.dropDownBtn}>
      <Button
        icon={<MenuOutlined />}
        type="text"
        size="large"
        onClick={toggleClick}
      />
    </div>
  );
}

export default MenuDropDownBtn;
