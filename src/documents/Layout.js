import React from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router'
import Footer from './Footer'
import ScrolltoTop from './ScrolltoTop'
import { ScrollRestoration } from 'react-router-dom'

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  let differenctPageMargin = '';
  if(path === '/chudidarpage' || path === '/sareepage' || path === '/handbagpage' || path === '/shoepage' || path === '/suitpage' || path === '/jeanspage'
    || path === '/laptoppage'  || path === '/phonepage' || path === '/tvpage' || path === '/acpage' || path === '/fridgepage' || path === '/gamepage' 
    || path === '/watchpage' || path === '/seecart' || path === '/wishlist' || path === '/signup' || path === '/login')
    {
    differenctPageMargin = 'allmargin';
  }else if(path === '/' || path === '/category'){
    differenctPageMargin = 'homepageMargin';
  }
  else{
    differenctPageMargin = 'defaultmargin'
  }

  return (
    <>
    <Navbar/>
    <ScrolltoTop/>
    <ScrollRestoration/>
    <div className={`outlet ${differenctPageMargin}`} >
    <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout;