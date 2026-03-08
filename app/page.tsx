"use client";

import { useState } from "react";
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import Main from "./components/Main/Main"
import Footer from "./components/Footer/Footer"

export default function Home() {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [isUserLogedIn, setUserState] = useState(false);
  return (
    <div className="flex">
      {sidebarShow && <Sidebar isUserLogedIn={isUserLogedIn}/>}
      <section className="flex flex-col w-full h-screen">
        <Header setSidebarShow={setSidebarShow} sidebarShow={sidebarShow}/>
        <Main />
        <Footer />
      </section>
    </div>
  );
}
