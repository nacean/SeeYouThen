import React, { useState } from 'react';
import { useIsMobile } from '../../responsive/responsiveCollection';
import styles from './Header.module.scss';
import MenuDropDownBtn from './MenuDropDownBtn';
import NavBar from './NavBar';

function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [dropMenu, setDropMenu] = useState<boolean>(false);
  const isMobile = useIsMobile();

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.mainTitle}>SeeYouThen</h1>
      {(!isMobile || showMenu) && (
        <NavBar
          dropMenu={dropMenu}
          setShowMenu={setShowMenu}
          setDropMenu={setDropMenu}
        />
      )}
      {isMobile && (
        <MenuDropDownBtn
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setDropMenu={setDropMenu}
        />
      )}
    </header>
  );
}

export default Header;
