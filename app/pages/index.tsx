import type { NextPage } from "next";
import React, { useContext, useState, useEffect, useCallback } from "react";
import ImageGrid from "../components/ImageGrid";
import Logo from "../components/Logo";
import { ClassificationContext } from "../services/ClassificationService";

import styles from "../styles/Page.module.scss";

const Home: NextPage = () => {
  const classificationContext = useContext(ClassificationContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = useCallback(async () => {
    await classificationContext.init();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <main className={styles.wrapper}>
      <Logo />
      <ImageGrid />
    </main>
  );
};

export default Home;
