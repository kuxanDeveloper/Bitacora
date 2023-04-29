import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getConfig from "next/config";

import { apiHandler, usersRepo } from "helpers/api";

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
  post: authenticate,
});

function authenticate(req, res) {
  const { username, password } = req.body;
  const user = usersRepo.find((u) => u.username === username);

  // validate
  if (!(user && bcrypt.compareSync(password, user.hash))) {
    throw "Usuario o contraseña incorrecta";
  }

  // create a jwt token that is valid for 7 days
  const tokenPassword = jwt.sign(
    { pass: password },
    serverRuntimeConfig.AES256_LOGIN_Key,
    { expiresIn: "8h", algorithm: ["HS256"] }
  );

  // return basic user details and token
  return res.status(200).json({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    tokenPassword,
  });
}
