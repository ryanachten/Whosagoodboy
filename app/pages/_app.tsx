import "../styles/globals.scss";
import type { AppProps } from "next/app";
import React from "react";
import useClassificationSetup from "../hooks/useClassificationSetup";
import LoadingSplash from "../components/LoadingSplash";

function MyApp({ Component, pageProps }: AppProps) {
  const loading = useClassificationSetup();

  if (loading) {
    return <LoadingSplash />;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
