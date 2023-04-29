import { useEffect } from "react";
import { userService } from "../services/UserService";
import Router from "next/router";
export default function Home() {
  // useEffect(() => {
  //   // redirect to home if already logged in
  //   if (!userService.userValue) {
  //     Router.push(`/Account/Login`);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      hola{" "}
      <button
        onClick={() => {
          userService.logout();
        }}
      >
        cerrar sesion
      </button>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    return {
      props: {
        path: null,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/Account/Login",
      },
    };
  }
}
