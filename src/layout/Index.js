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
    ValueImagesrc2,
    setValueImagesrc2,
    isImagenOne,
    setisImagenOne,
    DobleImagen,
    setdobleImagen,
    isImagenExterna,
    setisImagenExterna,
  } = useContextBitacora();

  const HandleButtonClick_Close = (stateModal) => {
    setShowModal(stateModal);
    setishabiliteBtn(false);
    setisImagenOne(false);
    setdobleImagen(false);
    setisImagenExterna(false);
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
              ValueImagesrc={ValueImagesrc}
              setValueImagesrc={setValueImagesrc}
              ValueImagesrc2={ValueImagesrc2}
              setValueImagesrc2={setValueImagesrc2}
              isImagenOne={isImagenOne}
              setisImagenOne={setisImagenOne}
              DobleImagen={DobleImagen}
              isImagenExterna={isImagenExterna}
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
