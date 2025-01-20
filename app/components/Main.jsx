import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Main({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}


