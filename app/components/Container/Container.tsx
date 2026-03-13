"use client";

import { useState } from "react";
import Header from "../../components/Header/Header"
import Sidebar from "../../components/Sidebar/Sidebar"
import Footer from "../../components/Footer/Footer"
import Main from "../Main/Main";

export default function Container({children}: {children: React.ReactNode}) {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [isUserLogedIn, setUserState] = useState(true); // Set to true by default to show sidebar
  
  const isAuthPage = !isUserLogedIn;
  
  return (
    <div className="flex">
      {sidebarShow && <Sidebar isUserLogedIn={isUserLogedIn}/>}
      <section className="flex flex-col w-full h-screen">
        <Header setSidebarShow={setSidebarShow} sidebarShow={sidebarShow}/>
        <Main isAuthPage={isAuthPage}>{children}</Main>
        <Footer />
      </section>
    </div>
  );
}
