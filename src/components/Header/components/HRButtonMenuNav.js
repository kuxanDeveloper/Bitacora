import React from "react";
import Styles from "../../../styles/Header.module.css";
import Link from "next/link";
import { OnclickNAvToggle } from "../../Tools/functiones";
import { useContextBitacora } from "../../../context/BitacoraContext";
function HRButtonMenuNav() {
  const { MenuShow, setMenuShow } = useContextBitacora();
  return (
    <>
      <Link
        href={""}
        title="Menú opciones"
        onClick={(e) => {
          e.preventDefault();
          OnclickNAvToggle(MenuShow,setMenuShow);
        }}
      >
        <span className={Styles.expand_nav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#2f2f2f"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </span>
      </Link>
    </>
  );
}

export default HRButtonMenuNav;
