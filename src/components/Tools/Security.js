import { userService } from "../../services/UserService";
import Swal from "sweetalert2";
import Router from "next/router";

export const onSubmit = ({ username, pass }) => {
  return userService
    .login(username, pass)
    .then(() => {
      window.location.href = "/#Cactive";
      // Router.push({ pathname: "/", hash: "Cactive" }, undefined, {
      //   unstable_skipClientCache: true,
      // });
    })
    .catch((error) => {
      if (
        error == "Límite de tiempo excedido" ||
        error == "Usuario o clave incorrectos" ||
        error == "No se pudo hacer el login, revise los datos enviados"
      ) {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico" + error,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in login");
    });
};

export const OnSubmitForward = ({ username }) => {
  Swal.fire({
    title: "¡Enviado!",
    text: `Se envio un correo al ${username} para restablecer la contraseña`,
    icon: "success",
    confirmButtonText: "Cerrar",
  });

  return Router.push({ pathname: "/account/Login" });
};

export const QueryActiveInactivegroup_GetUsers = (cookie, idAncestro) => {
  return userService
    .ListGroupActiveeInactive_ListUsers(
      cookie,
      idAncestro == null || idAncestro == undefined ? "1" : idAncestro
    )
    .then((e) => {
      return e;
    })
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
      console.log(error, "erro in Listado grupo y usuarios");
      return null;
    });
};

export const queryListUserAll = (cookie) => {
  return userService.listUserGetAll(cookie).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in Listado Usuario");
    return null;
  });
};

export const QueryGroupList = (cookie, idAncestro, estado) => {
  return userService.ListGroup(cookie, idAncestro, estado).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(error, "erro in login");
    return error;
  });
};

export const QueryMueForGroup = (
  cookie,
  Estado,
  idGroup,
  Numstiker,
  DateAdmission,
  Cod_sticker,
  page,
  tipoSearch
) => {
  return userService
    .ListGroupForMue(
      cookie,
      Estado,
      idGroup,
      Numstiker,
      DateAdmission,
      Cod_sticker,
      page,
      tipoSearch
    )
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in active grupo");
      return error;
    });
};

export const QueryFechaBit = (cookie, DateIni, DateFin, page,grupo) => {
  return userService
    .InfoFechaBitac(cookie,
      DateIni == null ? "" : DateIni,
      DateFin == null ? "" : DateFin,
      page == null || page == undefined ? "1" : page,
      grupo== null ? "" : grupo)
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in active grupo");
      return error;
    });
};

export const CsvFechaBit = (Fecha_inicial,
  Fecha_final,
  Id_grupo) => {
  return userService
    .ExportcsvFechas(
      Fecha_inicial == null ? "" : Fecha_inicial,
      Fecha_final == null ? "" : Fecha_final,
      Id_grupo == null ? "" : Id_grupo)
      .then((response) => {
        Swal.fire({
          title: "Archivo csv guardado",
          text: "Se encuntra en la ruta: " + response,
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      })
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "error in csv Fechas");
      return error;
    });
};


export const QueryMuestraEdit = (cookie, idSticker) => {
  return userService.InfoSample(cookie, idSticker).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(error, "erro in muestra edit");
    return error;
  });
};

export const queryTestListxGroup = (cookie, idGroup, idBitacora) => {
  return userService.ListTests(cookie, idGroup, idBitacora).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(error, "erro in listado de prueba grupo");
    return error;
  });
};

export const queryResultListxTests = (cookie, idPrueba, idBitacora) => {
  return userService
    .ListResults(cookie, idPrueba, idBitacora)
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in login");
      return error;
    });
};

export const queryOptionesListxPlantilla = (cookie, idPlantilla) => {
  return userService.ListoptionPlantilla(cookie, idPlantilla).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(error, "erro in optionesPlantilla");
    return error;
  });
};

export const QueryNoteEdit = (cookie, idNote) => {
  return userService.InfoSampleNote(cookie, idNote).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Porfavor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(error, "erro in editar nota");
    return error;
  });
};

export const queryInfoEditResult = (cookie, idResult) => {
  return userService.InfoSampleResult(cookie, idResult).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(error, "erro in editar resultado");
    return error;
  });
};

export const QueryCloseCaseSample = (id, observacionCaso, Estado) => {
  return userService
    .CloseCaseSample(id, observacionCaso, Estado)
    .catch((error) => {
      console.log(error, "erro in editar resultado");
      return Swal.showValidationMessage(`Request failed: ${error}`);
    });
};

export const CloseMasiveCaseSample = (ListadoBitacoras, observacionCaso, Estado) => {
  return userService
    .CloseMasiveStickers(ListadoBitacoras, observacionCaso, Estado)
    .catch((error) => {
      console.log(error, "erro in cerrar bloque");
      return Swal.showValidationMessage(`Request failed: ${error}`);
    });
};


export const QueryDeleteResult = (Codigo_resultado_bitacora) => {
  return userService.DeleteResult(Codigo_resultado_bitacora).catch((error) => {
    console.log(error, "erro in eliminar resultado");
    return Swal.showValidationMessage(`Request failed: ${error}`);
  });
};

export const ValidNumSticker = (cookie, num_stricker, estadobit) => {
  return userService.ValidNumSticker(cookie, num_stricker, estadobit).catch((error) => {
    console.log(error, "erro in eliminar resultado");
    return Swal.showValidationMessage(`Request failed: ${error}`);
  });
};

export const QueryObserva = (cookie) => {
  return userService.lstObservall(cookie).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in Listado observaciones");
    return null;
  });
};

export const QuerySitioAnatomico = (cookie) => {
  return userService.lstSitioAnatomico(cookie).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in Listado observaciones");
    return null;
  });
};

export const QueryJefeLaboratorio = (cookie) => {
  return userService.lstLaboratorio(cookie).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in Listado observaciones");
    return null;
  });
};

export const QueryTipoMuestra = (cookie, idGrupo) => {
  return userService.lstTipoMuestra(cookie, idGrupo).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in Listado observaciones");
    return null;
  });
};

export const QueryAncestro = (cookie) => {
  return userService.lstAncestros(cookie).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in Listado ancestro");
    return null;
  });
};

export const QuerySufijoGetAll = (cookie) => {
  return userService.lstSufijoGetall(cookie).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    console.log(error, "erro in sufijoAll");
    return null;
  });
};

export const queryListMultipleMicroxTextxNumber = (cookie, idGroup) => {
  return userService.ListMultipleMixPruxNum(cookie, idGroup).catch((error) => {
    if (error == "401: Token incorrecto o vencido") {
      Swal.fire({
        title: "¡Advertencia!",
        text: error,
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
    } else {
      Swal.fire({
        title: "¡Ha ocurrido un error!",
        text: "Por favor comunicarse con soporte técnico",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }

    console.log(
      error,
      "erro in listado multiple de pruebas, microorganismo y numero"
    );
    return error;
  });
};

export const QueryStatistics = (cookie, FechaIni, FechaFin) => {
  return userService
    .ListStatisticsGeneral(cookie, FechaIni, FechaFin)
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in listado consulta estadisticas");
      return error;
    });
};

export const QueryPruebasSimple = (cookie, idGroup) => {
  return userService
    .ListPruebasxGruposSample(cookie, idGroup)
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in listado consulta Pruebas x grupos en combo");
      return error;
    });
};

export const QueryUpdatePanelsecundary = (
  cookie,
  idGroup,
  fechaini,
  fechafin
) => {
  return userService
    .ListUpdatePanelSecundary(cookie, idGroup, fechaini, fechafin)
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in listado consulta Pruebas x grupos en combo");
      return error;
    });
};

export const QueryUpdatePanelTerciario = (
  cookie,
  idGroup,
  idStatus,
  fechaini,
  fechafin
) => {

  return userService
    .ListUpdatePanelTertiary(cookie, idGroup, idStatus, fechaini, fechafin)
    .catch((error) => {
      if (error == "401: Token incorrecto o vencido") {
        Swal.fire({
          title: "¡Advertencia!",
          text: error,
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
      } else {
        Swal.fire({
          title: "¡Ha ocurrido un error!",
          text: "Por favor comunicarse con soporte técnico",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }

      console.log(error, "erro in listado consulta Pruebas x grupos en combo");
      return error;
    });
};



