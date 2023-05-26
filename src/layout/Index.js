import React, { useEffect } from "react";
import Pop_up from "../components/Tools/Pop_up";

import HeaderIndex from "../components/Header/HeaderIndex";
import { initLogInactive } from "../components/Tools/Loginactivity";
import { useContextBitacora } from "../context/BitacoraContext";
function Index({ children }) {
  const {
    authorized,
    Urlauthorized,
    showModal,
    setShowModal,
    ishabiliteBtn,
    setishabiliteBtn,
    ValueImagesrc,
    setValueImagesrc,
  } = useContextBitacora();

  const HandleButtonClick_Close = (stateModal) => {
    setShowModal(stateModal);
  };
  useEffect(() => initLogInactive(), []);

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
              ishabiliteBtn={ishabiliteBtn}
              setishabiliteBtn={setishabiliteBtn}
              ValueImagesrc={ValueImagesrc}
              setValueImagesrc={setValueImagesrc}
            ></Pop_up>
          ) : (
            ""
          )}
          <main>{children}</main>
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
