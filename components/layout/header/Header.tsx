import Link from 'next/link';
import React from 'react';
import style from './Header.module.scss';
function Header() {
  return (
    <header className={style.headerContainer}>
      <h1 className={style.mainTitle}>SeeYouThen</h1>
      <nav className={style.navBar}>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
