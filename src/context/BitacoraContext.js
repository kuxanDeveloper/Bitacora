import { createContext, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
export const BitacoraContext = createContext();

export const useContextBitacora =() => useContext(BitacoraContext);

export const BicatoraContexProvider = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}`;

  return (
    <BitacoraContext.Provider value={{ isMobile, URL }}>
      {children}
    </BitacoraContext.Provider>
  );
};
