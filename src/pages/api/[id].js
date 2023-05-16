// import React, { useEffect, useState } from "react";
// import { apiHandler } from "helpers/api";
import {
  QueryGroupList,
  QueryMueForGroup,
} from "../../components/Tools/Security";
import { userService } from "../../services/UserService";


export const ApiQueryGeneralSample = async (
  cookie,
  id,
  setGrupoNombre,
  setListadoGrupo,
  setListadoMuestraActivo,
  setListadoMuestraInactivo
) => {
  let Lisgrupo = await QueryGroupList(cookie);
  setListadoGrupo(Lisgrupo);
  let listActivoMue = await QueryMueForGroup(cookie, "1", id);
  setListadoMuestraActivo(listActivoMue);
  let listInactimue = await QueryMueForGroup(cookie, "0", id);
  setListadoMuestraInactivo(listInactimue);
  let nombreGrupo = await Lisgrupo.find((data) => data.Id_grupo == id)
    .NOMBRE_GRUPO;
  setGrupoNombre(nombreGrupo);

  if (
    Lisgrupo == "401: Token incorrecto o vencido" ||
    listActivoMue == "401: Token incorrecto o vencido" ||
    listInactimue == "401: Token incorrecto o vencido"
  ) {
    userService.logout();
    return "";
  }
};

// function getById(req, res) {
//     const user = usersRepo.getById(req.query.id);

//     if (!user) throw 'User Not Found';

//     return res.status(200).json(omit(user, 'hash'));
// }

// function update(req, res) {
//     const user = usersRepo.getById(req.query.id);

//     if (!user) throw 'User Not Found';

//     // split out password from user details
//     const { password, ...params } = req.body;

//     // validate
//     if (user.username !== params.username && usersRepo.find(x => x.username === params.username))
//         throw `User with the username "${params.username}" already exists`;

//     // only update hashed password if entered
//     if (password) {
//         user.hash = bcrypt.hashSync(password, 10);
//     }

//     usersRepo.update(req.query.id, params);
//     return res.status(200).json({});
// }

// function _delete(req, res) {
//     usersRepo.delete(req.query.id);
//     return res.status(200).json({});
// }
