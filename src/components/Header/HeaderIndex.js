import React from "react";
import Styles from "../../styles/Header.module.scss";
import HRButtonMenuNav from "./components/HRButtonMenuNav";
import HRbuttonCloseSession from "./components/HRbuttonCloseSession";
import HRLogoNav from "./components/HRLogoNav";
import HRMenu from "./components/HRMenu";
function HeaderIndex() {
  return (
    <>
      <header className={Styles.header}>
        <div className={Styles.header_conent}>
          <HRButtonMenuNav />
          <HRbuttonCloseSession />
          <HRLogoNav />
        </div>

        <HRMenu />
      </header>
    </>
  );
}

export default HeaderIndex;
