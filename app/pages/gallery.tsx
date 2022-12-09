import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import ImageGrid from "../components/ImageGrid";
import PageHeader from "../components/PageHeader";

import styles from "../styles/Page.module.scss";

const Gallery: NextPage = () => {
  return (
    <main className={styles.wrapper}>
      <Head>
        <title>whosagoodboy | Gallery</title>
      </Head>
      <PageHeader />
      <ImageGrid />
    </main>
  );
};

export default Gallery;
