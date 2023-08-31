import {
  QueryMuestraEdit,
  QueryNoteEdit,
  QueryCloseCaseSample,
  CloseMasiveCaseSample,
  QueryDeleteResult,
  QueryObserva,
  QueryJefeLaboratorio,
  QuerySitioAnatomico,
  QueryTipoMuestra,
  ValidNumSticker,
} from "../../../../components/Tools/Security";
import { QueryActivegroup } from "../../../../components/Tools/CRUD";
import Swal from "sweetalert2";
import Router from "next/router";

export const SampleDetailsEdit = async (
  cookie,
  id,
  setLInforSampleDetails,
  setLstObservacionesPrede
) => {
  let inforSample = await QueryMuestraEdit(cookie, id);
  let lstObervsa = await QueryObserva(cookie);
  setLInforSampleDetails(inforSample);
  setLstObservacionesPrede(lstObervsa.listadoObservacion);
};

export const InfoteNoteEditApi = async (cookie, id, setInfoNote) => {
  let infoNote = await QueryNoteEdit(cookie, id);
  setInfoNote(infoNote);
};

export const CloseCaseSample = async (id, observacionCaso, Estado) => {
  let infoNote = await QueryCloseCaseSample(id, observacionCaso, Estado);
  return infoNote;
};

export const CierreMasiveCaseSample = async (
  ListadoBitacoras,
  observacionCaso,
  Estado
) => {
  let infoNote = await CloseMasiveCaseSample(
    ListadoBitacoras,
    observacionCaso,
    Estado
  );
  return infoNote;
};

export const DeleteResultSegm = async (
  Codigo_resultado_bitacora,
  IdPrub,
  codresult
) => {
  let infoNote = await QueryDeleteResult(Codigo_resultado_bitacora);
  if (infoNote == "Todo Eliminado") {
    document.getElementById("Estatus" + IdPrub).remove();
  } else if (infoNote == "El estatus se elimino correctamente") {
    document.getElementById("SeguRest" + codresult).remove();
  }

  return infoNote;
};

export const ValidNumeroSticker = async (
  cookie,
  num_stricker,
  estadobit,
  idAncest
) => {
  let infoNote = await ValidNumSticker(cookie, num_stricker, estadobit);
  if (infoNote.mensajerpt == "Sin coincidencia") {
    Swal.fire({
      title: "¡Advertencia!",
      text: "Debe indicar el valor de algunos de los filtros disponible para realizar la búsqueda avanzada",
      icon: "warning",
      confirmButtonText: "Cerrar",
    });
  } else {
    Router.push({
      pathname: "/[id]",
      query: {
        id: infoNote.codigoGrupo,
        Numstiker: num_stricker,
        DateAdmission: "",
        idAncestro: 1,
        page: "1",
        tipoSearch: infoNote.mensajerpt,
      },
    });
  }

  return infoNote;
};

export const ListSitioAnatomico = async (cookie, setListadoSitioAna) => {
  let lstSitioAnatomico = await QuerySitioAnatomico(cookie);
  setListadoSitioAna(lstSitioAnatomico);
};

export const ListJefeLaboratorio = async (
  cookie,
  setListadoJefeLaboratorio
) => {
  let lstLabotario = await QueryJefeLaboratorio(cookie);
  setListadoJefeLaboratorio(lstLabotario);
};

export const ListTipoMuestra = async (
  cookie,
  setListadoTipoMuestra,
  idGroup
) => {
  let lstTipoMuestra = await QueryTipoMuestra(cookie, idGroup);
  setListadoTipoMuestra(lstTipoMuestra);
};

export const queryGroup = async (cookie, setListadoGrupoActivo) => {
  let ListGroup = await QueryActivegroup(cookie, "1");
  setListadoGrupoActivo(ListGroup);
};
