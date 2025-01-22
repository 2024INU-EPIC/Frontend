import React from "react";
import Header from "../components/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F0F0F0",
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
