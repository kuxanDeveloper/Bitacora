import React from "react";

function Privacypolicy() {
  return <div>Politica de privacidad</div>;
}

export default Privacypolicy;

export async function getStaticProps() {
  return {
    props: {
      path: null,
    },
    revalidate: 86400,
  };
}
