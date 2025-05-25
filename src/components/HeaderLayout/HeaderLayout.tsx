import React from "react";
import Navbar from "../Navbar";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar isScrolled={false} />
      <main>{children}</main>{" "}
    </>
  );
};

export default HeaderLayout;