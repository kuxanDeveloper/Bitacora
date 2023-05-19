import React from "react";
import Styles from "../../../styles/Header.module.css";
import Link from "next/link";
import ImageOptimize from "../../Tools/ImageOptimize";
function HRLogoNav() {
  return (
    <>
      <Link href={"/#Cactive"}>
        <ImageOptimize
          Values={{
            src: "/img/Becton_Dickinson_logo 128x128.png",
            title: "",
            classValue: Styles.header_logo,
            width: 65,
            height: 25,
            style: {},
            alt: "Login BD",
          }}
        />
      </Link>
    </>
  );
}

export default HRLogoNav;
