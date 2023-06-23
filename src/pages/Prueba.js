import React, { useEffect } from "react";
import Quagga from "quagga";

function IndexPrueba() {
  useEffect(() => {
    const $resultados = document.querySelector("#resultado");
    Quagga.init(
      {
        inputStream: {
          constraints: {
            width: 1920,
            height: 1080,
          },
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#contenedor"), // Pasar el elemento del DOM
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Iniciado correctamente");
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      $resultados.textContent = data.codeResult.code;
      // Imprimimos todo el data para que puedas depurar
      console.log(data);
    });
  }, []);

  return (
    <>
      <p id="resultado">Aquí aparecerá el código</p>
      <p>A continuación, el contenedor: </p>
      <div id="contenedor"></div>
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
