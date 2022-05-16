import Link from 'next/link';
import React from 'react';
import style from './Header.module.scss';
function Header() {
  return (
    <header className={style.headerContainer}>
      <h1 className={style.mainTitle}>SeeYouThen</h1>
      <nav className={style.navBar}>
        <ul className={style.navList}>
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
