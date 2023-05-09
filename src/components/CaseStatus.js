import React, { useEffect, useState } from "react";
import CaseStyles from "@/styles/CaseStatus.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
export default function CaseStatus() {
  const [isTrueActive, setisTrueActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      if (
        hash == "Cactive" ||
        hash == "" ||
        hash == null ||
        hash == undefined
      ) {
        setisTrueActive(true);
      } else {
        setisTrueActive(false);
      }
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  return (
    <>
      <section className={CaseStyles.case_status}>
        <div className={CaseStyles.cases_container}>
          <div className={CaseStyles.state}>
            <p
              className={`${CaseStyles.status} ${
                isTrueActive ? CaseStyles.active : ""
              }`}
            >
              <Link
                href={{ pathname: "/", hash: "Cactive" }}
                className={CaseStyles.status_link}
              >
                Casos activos
              </Link>
            </p>
            <p
              className={`${CaseStyles.status} ${
                !isTrueActive ? CaseStyles.active : ""
              }`}
            >
              <Link
                href={{ pathname: "/", hash: "Cinactvie" }}
                className={CaseStyles.status_link}
              >
                Casos inactivos
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
