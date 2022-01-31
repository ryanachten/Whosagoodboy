import type { NextPage } from "next";
import React from "react";
import ImageGrid from "../components/ImageGrid";
import PageHeader from "../components/PageHeader";

import styles from "../styles/Page.module.scss";

const Gallery: NextPage = () => {
  return (
    <main className={styles.wrapper}>
      <PageHeader />
      <ImageGrid />
    </main>
  );
};

export default Gallery;
