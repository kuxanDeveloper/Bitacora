import React, { useEffect, useState } from "react";
import Scanner from "../components/Tools/Pop_upScanner";

function IndexPrueba() {
  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState(null);

  const onDetected = (result) => {
    setResult(result);
  };

  return (
    <>
      <div className="App">
        <p>{result ? result : "Scanning..."}</p>
        <button onClick={() => setCamera(!camera)}>
          {camera ? "Stop" : "Start"}
        </button>
        <div className="container">
          {camera && <Scanner onDetected={onDetected} />}
        </div>
      </div>
    </>
  );
}

export default IndexPrueba;

export async function getStaticProps() {
  return {
    props: {
      path: null,
    },
    revalidate: 86400,
  };
}
