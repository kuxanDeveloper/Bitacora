import React from "react";

function CreatePage() {
  return <div>HOla</div>;
}

export default CreatePage;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.cookies["tokenUserCookie"];
  if (cookie) {
    return {
      props: {
        cookie: cookie,
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
