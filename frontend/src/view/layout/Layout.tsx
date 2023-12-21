import React from "react";
import Header from "./HeaderTop";

function Layout(props) {
  return (
    <div className="relative bg-slate-300" style={{ height: "100dvh" }}>
      <Header />
      <div className="app__content">{props.children}</div>
    </div>
  );
}

export default Layout;
