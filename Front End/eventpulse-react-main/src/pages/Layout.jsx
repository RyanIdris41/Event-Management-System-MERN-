import React from 'react';
import Header from '../components/Navbar';
import Footer from '../components/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <div className="pre-footer">
        <Header />
        {children}
      </div>
      <Footer/>
    </>
  );
}

export default Layout;