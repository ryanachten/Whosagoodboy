import type { NextPage } from "next";
import React from "react";
import ImageGrid from "../components/ImageGrid";
import LoadingSplash from "../components/LoadingSplash";
import PageHeader from "../components/PageHeader";
import useClassificationSetup from "../hooks/useClassificationSetup";

import styles from "../styles/Page.module.scss";

const Gallery: NextPage = () => {
  const loading = useClassificationSetup();
  if (loading) {
    return <LoadingSplash />;
  }

  return (
    <main className={styles.wrapper}>
      <PageHeader />
      <ImageGrid />
    </main>
  );
};

export default Gallery;
