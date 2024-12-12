import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
        <main className="flex-grow p-4 bg-white">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};
