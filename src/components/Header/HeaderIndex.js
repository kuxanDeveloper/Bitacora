import React from "react";
import HederStyles from "../../styles/Header.module.css";

function HeaderIndex() {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={headerStyles.header_conent}>
          <span className={headerStyles.close_session}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-external-link"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2f2f2f"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
              <line x1="10" y1="14" x2="20" y2="4" />
              <polyline points="15 4 20 4 20 9" />
            </svg>
          </span>

          <img
            src="https://www.bd.com/content/dam/bdcom-assets/en/en-us/images/graphic/icon/header-bd-logo.svg"
            alt=""
            className={headerStyles.header_logo}
          />
        </div>
      </header>
    </>
  );
}

export default HeaderIndex;
