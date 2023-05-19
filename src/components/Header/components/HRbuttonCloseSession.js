import React from "react";
import Styles from "../../../styles/Header.module.css";
import Link from "next/link";
import { userService } from "@/services/UserService";
function HRbuttonCloseSession() {
  return (
    <>
      <Link
        href={""}
        title="Cerrar sesión"
        onClick={(e) => {
          e.preventDefault();
          userService.logout();
        }}
      >
        <span className={Styles.close_session}>
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
            <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
            <line x1="10" y1="14" x2="20" y2="4" />
            <polyline points="15 4 20 4 20 9" />
          </svg>
        </span>
      </Link>
    </>
  );
}

export default HRbuttonCloseSession;
