import React, { ReactElement } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';

interface layoutType {
  children: ReactElement;
}

function Layout({ children }: layoutType) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
