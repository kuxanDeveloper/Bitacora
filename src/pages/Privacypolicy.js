import React from "react";
import  Legal from "@/components/Body/Legal"
function Privacypolicy() {
  return <Legal></Legal>;
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
