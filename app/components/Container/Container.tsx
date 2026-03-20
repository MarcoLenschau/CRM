"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Footer from "../../components/Footer/Footer"
import Main from "../Main/Main";

/**
 * Main application layout container managing sidebar, header, and content area.
 * Handles authentication state and admin status verification on mount.
 *
 * @param children - Content to render in the main area
 * @return Complete page layout with header, sidebar, main content, and footer
 * @throws Error if authentication check fails; displays logged-out state with limited navigation
 * @category Layout
 * @security Checks authentication status and admin privileges on load, manages session state
 * @performance Real-time state management with session storage, optimized re-renders on auth changes
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
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
    } catch {
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
