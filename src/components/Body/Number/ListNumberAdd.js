import React from "react";
import styleTable from "../../../styles/TableStyles.module.scss";
import styles from "../../../styles/CreateNotes.module.scss";
import Link from "next/link";
import { DeleteRowNumber } from "../../Tools/functiones";
function ListNumberAdd({ ListNumberAddObje, setListNumberAddObje }) {
  return (
    <>
      <div className={styles.input_group}>
        <table className={styleTable.tableStyle}>
          <thead>
            <tr>
              <th>Número</th>
              <th>Estado</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {ListNumberAddObje.length > 0 ? (
              ListNumberAddObje.map((data, index) => (
                <tr key={index} id={data.number}>
                  <td className={styleTable.textCenterColumn}>
                    <p>{data.number}</p>
                  </td>
                  <td className={styleTable.textCenterColumn}>
                    {data.Estado ? (
                      <span>&#x2705;</span>
                    ) : (
                      <span>&#10060;</span>
                    )}
                  </td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <Link
                      title="Eliminar número"
                      className={styleTable.colorrojoBoton}
                      type="button"
                      href={""}
                      onClick={(e) => {
                        e.preventDefault();
                        DeleteRowNumber(
                          data.number,
                          setListNumberAddObje,
                          ListNumberAddObje
                        );
                      }}
                    >
                      <span>&#128941;</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListNumberAdd;
