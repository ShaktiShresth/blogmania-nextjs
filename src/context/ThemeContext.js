"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

// BELOW code to persist dark/light mode in local storage, in case
// of page refresh, user's theme preference will be retained

// -----------------------------------------------------
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [mode, setMode] = useState(() => {
//     if (typeof window === "undefined") return "light";
//     if (document.documentElement.classList.contains("dark")) return "dark";
//     return "light";
//   });

//   useEffect(() => {
//     const root = document.documentElement;
//     const body = document.body;

//     root.classList.remove("light", "dark");
//     body.classList.remove("light", "dark");
//     root.classList.add(mode);
//     body.classList.add(mode);

//     localStorage.setItem("theme", mode);
//   }, [mode]);

//   const toggle = () => {
//     setMode((prev) => (prev === "dark" ? "light" : "dark"));
//   };

//   return (
//     <ThemeContext.Provider value={{ toggle, mode }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
