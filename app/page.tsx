"use client";

import { useState } from "react";
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"

export default function Home() {
  const [sidebarShow, setSidebarShow] = useState(true)
  return (
    <div className="flex">
      {sidebarShow ? <Sidebar /> : ""}
      <Header setSidebarShow={setSidebarShow} sidebarShow={sidebarShow}/>
    </div>
  );
}
