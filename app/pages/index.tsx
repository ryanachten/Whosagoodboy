import type { NextPage } from "next";
import React, { useContext, useState, useEffect, useCallback } from "react";
import Logo from "../components/Logo";
import { ClassificationContext } from "../services/ClassificationService";
import LandingCard from "../components/LandingCard";
import DogFaceIcon from "../components/icons/DogFaceIcon";
import PoodleIcon from "../components/icons/PoodleIcon";

import pageStyles from "../styles/Page.module.scss";
import styles from "../styles/Home.module.scss";
import { IconSize } from "../components/icons";

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
    <main className={`${pageStyles.wrapper} ${styles.wrapper}`}>
      <Logo className={styles.logo} />
      <div className={styles.cardWrapper}>
        <LandingCard
          variant="upload"
          icon={<DogFaceIcon size={IconSize.LARGE} />}
        />
        <LandingCard
          variant="gallery"
          icon={<PoodleIcon size={IconSize.LARGE} />}
        />
      </div>
    </main>
  );
};

export default Home;
