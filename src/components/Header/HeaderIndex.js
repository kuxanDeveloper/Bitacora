import React, { useEffect, useState } from "react";
import Styles from "../../styles/Header.module.scss";
import HRButtonMenuNav from "./components/HRButtonMenuNav";
import HRbuttonCloseSession from "./components/HRbuttonCloseSession";
import HRLogoNav from "./components/HRLogoNav";
import HRMenu from "./components/HRMenu";
import {
  OptionAdministrator,
  OptionAsiste,
  OptionTecnichal,
  OptionConsult,
  OptionDefault,
} from "../Tools/OpcitionHabilite";

function HeaderIndex() {
  const [Roles, setRoles] = useState(null);
  const [DescriptionRol, setDescriptionRol] = useState("");
  useEffect(() => {
    if (localStorage.getItem("RolUser") != null) {
      const ArrayRoles = JSON.parse(localStorage.getItem("RolUser"));
      ArrayRoles.map((data) => {
        if (data == 1) {
          setDescriptionRol("Rol: Root Administrador");
          setRoles(OptionAdministrator);
        } else if (data == 2) {
          setRoles(OptionTecnichal);
          setDescriptionRol("Rol: Técnico");
        } else if (data == 3) {
          setRoles(OptionAsiste);
          setDescriptionRol("Rol: Auxiliar");
        } else if (data == 4) {
          setDescriptionRol("Rol: Consultor");
          setRoles(OptionConsult);
        } else {
          setDescriptionRol("Rol: Sin rol");
          setRoles(OptionDefault);
        }
      });
    }
  }, []);

  return (
    <>
      <header className={Styles.header}>
        <div className={Styles.header_conent}>
          <HRButtonMenuNav />
          <HRbuttonCloseSession DescriptionRol={DescriptionRol} />
          <HRLogoNav />
        </div>

        <HRMenu Roles={Roles} />
      </header>
    </>
  );
}

export default HeaderIndex;
