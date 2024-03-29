import { createContext, useState, useContext, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
export const BitacoraContext = createContext();
import { useRouter } from "next/router";
import { userService } from "../services/UserService";
export const useContextBitacora = () => useContext(BitacoraContext);

export const BicatoraContexProvider = ({ children }) => {
  const router = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [showModal, setShowModal] = useState(false);
  const [showUser, setshowUser] = useState(false);
  const [showModalScanner, setshowModalScanner] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [Urlauthorized, setUrlauthorized] = useState(false);
  const [MenuShow, setMenuShow] = useState(false);
  const [ishabiliteBtn, setishabiliteBtn] = useState(false);
  const [ValueImagesrc, setValueImagesrc] = useState(null);
  const [ValueImagesrc2, setValueImagesrc2] = useState(null);
  const [LstObservacionesPrede, setLstObservacionesPrede] = useState([]);
  const [ValueImagesrcExterna, setValueImagesrcExterna] = useState(null);
  const [ValueImagesrcExterna2, setValueImagesrcExterna2] = useState(null);
  const [isImagenOne, setisImagenOne] = useState(false);
  const [DobleImagen, setdobleImagen] = useState(false);
  const [isImagenExterna, setisImagenExterna] = useState(false);
  const [ResultScanner, setResultScanner] = useState("");
  const [SelectMenuConfigracion, setSelectMenuConfigracion] = useState(false);
  const [SelectMenuTrazabilidad, setSelectMenuTrazabilidad] = useState(false);
  const [showModalFechas, setshowModalFechas] = useState(false);
  const [COD_BITACORA, setCOD_BITACORA] = useState(false);
  const [FECHA_HORA_INGRESO, setFECHA_HORA_INGRESO] = useState("");
  const [FECHA_HORA_VERIFICACION, setFECHA_HORA_VERIFICACION] = useState("");
  const [FECHA_INGRESO_BOTELLA, setFECHA_INGRESO_BOTELLA] = useState("");
  const [FECHA_HORA_SUENA_POSITIVO, setFECHA_HORA_SUENA_POSITIVO] = useState("");
  const [FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO, setFECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO] = useState("");
  const [FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA, setFECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA] = useState("");
  const [FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL, setFECHA_HORA_VALIDACION_INDENTIFICACION_FINAL] = useState("");
  const [FECHA_HORA_VALIDACION_ANTIBIOGRAMA, setFECHA_HORA_VALIDACION_ANTIBIOGRAMA] = useState("");
  const [ESTADO_STICKER_bit, setESTADO_STICKER_bit] = useState(null);
  const [SelectMenuEstadistica, setSelectMenuEstadistica] = useState(false);  
  const [showModalJefes, setshowModalJefes] = useState(false);
  const [Nuvjefe, setNuvjefe] = useState(0);  
  

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}`;

  function authCheck() {
    // redirect to login page if accessing a private page and not logged in
    let url = router.asPath;
    const path = url.split("?")[0];
    const publicPaths = [
      "/account/Register",
      "/account/Login",
      "/account/ForgotPassword",
      "/Privacypolicy",
    ];

    if (userService.userValue) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }

    if (publicPaths.includes(path)) {
      setUrlauthorized(true);
    } else {
      setUrlauthorized(false);
    }
  }

  useEffect(() => {
    // on initial load - run auth check
    authCheck();

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);

  return (
    <BitacoraContext.Provider
      value={{
        isMobile,
        URL,
        authorized,
        Urlauthorized,
        showModal,
        setAuthorized,
        setUrlauthorized,
        setShowModal,
        setMenuShow,
        MenuShow,
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
        LstObservacionesPrede,
        setLstObservacionesPrede,
        SelectMenuConfigracion,
        setSelectMenuConfigracion,
        showUser,
        setshowUser,
        SelectMenuTrazabilidad,
        setSelectMenuTrazabilidad,
        showModalFechas,
        setshowModalFechas,
        COD_BITACORA,
        setCOD_BITACORA,
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
        SelectMenuEstadistica,
        setSelectMenuEstadistica,
        showModalJefes,
        setshowModalJefes,
        Nuvjefe,
        setNuvjefe
      }}
    >
      {children}
    </BitacoraContext.Provider>
  );
};
