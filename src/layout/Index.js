import React, { useEffect } from "react";
import Pop_up from "../components/Tools/Pop_up";
import Pop_upScanner from "../components/Tools/Pop_upScanner";
import Pop_upFechas from "../components/Tools/Pop_up_Fechas";
import Pop_upJefe from "../components/Tools/Pop_up_JefeLab";
import HeaderIndex from "../components/Header/HeaderIndex";
import { initLogInactive } from "../components/Tools/Loginactivity";
import { useContextBitacora } from "../context/BitacoraContext";
import { yupResolver } from "@hookform/resolvers/yup";
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
    ValueImagesrcExterna,
    setValueImagesrcExterna,
    ValueImagesrcExterna2,
    setValueImagesrcExterna2,
    showModalScanner,
    setshowModalScanner,
    ResultScanner,
    setResultScanner,
    showModalFechas,
    setshowModalFechas,
    COD_BITACORA,
    FECHA_HORA_INGRESO,
    setFECHA_HORA_INGRESO,
    FECHA_HORA_VERIFICACION,
    setFECHA_HORA_VERIFICACION,
    FECHA_INGRESO_BOTELLA,
    setFECHA_INGRESO_BOTELLA,
    FECHA_HORA_SUENA_POSITIVO,
    setFECHA_HORA_SUENA_POSITIVO,
    FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO,
    setFECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO,
    FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA,
    setFECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA,
    FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL,
    setFECHA_HORA_VALIDACION_INDENTIFICACION_FINAL,
    FECHA_HORA_VALIDACION_ANTIBIOGRAMA,
    setFECHA_HORA_VALIDACION_ANTIBIOGRAMA,
    ESTADO_STICKER_bit,
    setESTADO_STICKER_bit,
    showModalJefes,
    setshowModalJefes,
    setNuvjefe,
    Nuvjefe
  } = useContextBitacora();


  const HandleButtonClick_Close = (stateModal) => {
    setShowModal(stateModal);
    setishabiliteBtn(false);
    setisImagenOne(false);
    setdobleImagen(false);
    setshowModalFechas(false);
    setshowModalJefes(false);
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
              ishabiliteBtn={ishabiliteBtn}
              ValueImagesrc={ValueImagesrc}
              setValueImagesrc={setValueImagesrc}
              ValueImagesrc2={ValueImagesrc2}
              setValueImagesrc2={setValueImagesrc2}
              isImagenOne={isImagenOne}
              setisImagenOne={setisImagenOne}
              DobleImagen={DobleImagen}
              isImagenExterna={isImagenExterna}
              ValueImagesrcExterna={ValueImagesrcExterna}
              ValueImagesrcExterna2={ValueImagesrcExterna2}
              setisImagenExterna={setisImagenExterna}
            ></Pop_up>
          ) : (
            ""
          )}

          {showModalScanner ? (
            <Pop_upScanner
              ResultScanner={ResultScanner}
              setResultScanner={setResultScanner}
              setshowModalScanner={setshowModalScanner}
            ></Pop_upScanner>
          ) : (
            ""
          )}

          {showModalFechas ? (
            <Pop_upFechas
              onClose={() => {
                HandleButtonClick_Close(false);
              }}
              COD_BITACORA={COD_BITACORA}
              FECHA_HORA_INGRESO={FECHA_HORA_INGRESO}
              FECHA_HORA_VERIFICACION={FECHA_HORA_VERIFICACION}
              FECHA_INGRESO_BOTELLA={FECHA_INGRESO_BOTELLA}
              FECHA_HORA_SUENA_POSITIVO={FECHA_HORA_SUENA_POSITIVO}
              FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO={
                FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO
              }
              FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA={
                FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA
              }
              FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL={
                FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL
              }
              FECHA_HORA_VALIDACION_ANTIBIOGRAMA={
                FECHA_HORA_VALIDACION_ANTIBIOGRAMA
              }
              ESTADO_STICKER_bit={ESTADO_STICKER_bit}
            ></Pop_upFechas>
          ) : (
            ""
          )}
          {showModalJefes ? (
            <Pop_upJefe
              onClose={() => {
                HandleButtonClick_Close(false);
              }}
              setNuvjefe={setNuvjefe}
              Nuvjefe={Nuvjefe}
            ></Pop_upJefe>
          ) : (
            ""
          )}
          <main onLoad={initLogInactive}>{children}</main>
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
