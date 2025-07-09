import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <main>
        <div className="flex justify-center bg-slate-200">
          {/* <div className="max-w-screen-2xl w-[95%]"> */}
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
