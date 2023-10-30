"use client";
import React, { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface providerType {
  toggle?: () => void;
  theme?: string;
}
export const Context = createContext<providerType>({});

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
};

export const ContextProvider = ({ children, ...delegated }: any) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());
  const [theme, setTheme] = useState<string | undefined>(() => {
    return getFromLocalStorage();
  });
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  //Saving theme
  useEffect(() => {
    if (theme) localStorage.setItem("theme", theme as any);
  }, [theme]);

  if (!hasMounted) return null;

  return (
    <React.Fragment {...delegated}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Context.Provider value={{ toggle, theme }}>
          <div className={`theme ${theme}`}>{children}</div>
        </Context.Provider>
      </QueryClientProvider>
    </React.Fragment>
  );
};
