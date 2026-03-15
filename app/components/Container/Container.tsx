"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Footer from "../../components/Footer/Footer"
import Main from "../Main/Main";

export default function Container({children}: {children: React.ReactNode}) {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [isUserLogedIn, setUserState] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is logged in and fetch their admin status
  const checkAuthStatus = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      
      if (!token) {
        setUserState(false);
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      const response = await fetch('/api/auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserState(true);
        setIsAdmin(data.isAdmin || false);
      } else {
        setUserState(false);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUserState(false);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Listen for logout event
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('logoutEvent', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logoutEvent', handleStorageChange);
    };
  }, []);
  
  const isAuthPage = !isUserLogedIn;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="flex">
      {sidebarShow && <Sidebar isUserLogedIn={isUserLogedIn} isAdmin={isAdmin}/>}
      <section className="flex flex-col w-full h-screen">
        <Header setSidebarShow={setSidebarShow} sidebarShow={sidebarShow}/>
        <Main isAuthPage={isAuthPage}>{children}</Main>
        <Footer />
      </section>
    </div>
  );
}
