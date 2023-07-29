import React from "react";
import styleTable from "../../../styles/TableStyles.module.scss";
import { DeleteRowStatus } from "../../Tools/functiones";
function ListResulltAdd({
  styles,
  ListAddResultMultple,
  setListAddResultMultple,
}) {
  return (
    <>
      <label className={styles.group_title}>Listado de estatus agregados</label>

      <table className={styleTable.tableStyle}>
        <thead>
          <tr>
            <th>Estatus</th>
            <th>Seguimiento</th>
            <th>Opciones</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {ListAddResultMultple.length > 0 ? (
            ListAddResultMultple.map((data, index) => (
              <tr
                key={index}
              >
                <td>{data.TextoEstatus}</td>
                <td>{data.textoSeguimiento}</td>
                <td>{data.OptionID != null ? data.textoOption : "N/A"}</td>
                <td>
                  <button
                    title="Eliminar status"
                    type="button"
                    className={styleTable.colorrojoBoton}
                    onClick={(e) => {
                      e.preventDefault();
                      DeleteRowStatus(data, setListAddResultMultple, ListAddResultMultple);
                    }}
                  >
                    <span>&#128941;</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ListResulltAdd;
