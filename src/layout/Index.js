import React from "react";
import Pop_up from "../components/Tools/Pop_up";

import HeaderIndex from "../components/Header/HeaderIndex";
import { initLogInactive } from "../components/Tools/Loginactivity";
import { useContextBitacora } from "../context/BitacoraContext";
function Index({ children }) {
  const { authorized, Urlauthorized, showModal, setShowModal } =
    useContextBitacora();

  const HandleButtonClick_Close = (stateModal) => {
    setShowModal(stateModal);
  };

  return (
    <>
      {/* <Loader></Loader> */}
      {/*Header */}
      {authorized && !Urlauthorized ? <HeaderIndex /> : ""}

      {/*body */}
      {authorized && !Urlauthorized ? (
        <>
          {showModal ? (
            <Pop_up
              onClose={() => {
                HandleButtonClick_Close(false);
              }}
            ></Pop_up>
          ) : (
            ""
          )}
          <main onLoad={initLogInactive()}>{children}</main>
        </>
      ) : (
        <main>{children}</main>
      )}
      {/* <Suspense fallback={<Loader />}>
        <main onLoad={initLogInactive()}>{children}</main>
      </Suspense> */}
      {/* <FooterIndex /> */}
    </>
  );
}

export default Index;
