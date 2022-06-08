import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "./MainLayout.module.scss";

interface IChildren {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IChildren) => {
  return (
    <>
      <div className={styles.hero_pattern}>
        <Header />
        <main className="w-full">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
