import React from "react";
import styles from "../../styles/CasesSumary.module.scss";

export default function CasesSumary() {
  return (
    <>
      <section className={styles.CasesSumary}>
        <div className={styles.container}>
          <div className={styles.card}>
            <a href="#">
              <span className={styles.card_arrow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-arrow-right"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#fff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M13 18l6 -6" />
                  <path d="M13 6l6 6" />
                </svg>
              </span>
            </a>

            <a href="#">
              <h3 className={styles.title}>Casos Activos</h3>
            </a>
            <a href="#">
              <p className={styles.card_paragraph}>
                <span className={styles.icon}></span>
                123645 Seguimientos
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
