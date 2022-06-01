import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from './NavBar.module.scss';

interface navBarType {
  dropMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setDropMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const dropDownAni = `from {
    transform: scaleY(0);
    height: 0;
  }
  to {
    transform: scaleY(1);
    height: 148px;
  }`;

function NavBar({ dropMenu, setShowMenu, setDropMenu }: navBarType) {
  return (
    <nav
      className={`${styles.navBar} ${
        dropMenu ? styles.navDropDown : styles.navDropUp
      }`}
    >
      <ul className={styles.navList}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/MakeRoomPage">
            <a>방만들기</a>
          </Link>
        </li>
        <li>
          <Link href="/ManualPage">
            <a>사용방법</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
