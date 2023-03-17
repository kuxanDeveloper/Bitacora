import React from "react";
import dynamic from "next/dynamic";
function Custom500() {
  const Page500 = dynamic(() => import("../components/Tools/Page500"));
  return <Page500 />;
}

export default Custom500;
