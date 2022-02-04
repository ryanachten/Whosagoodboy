import type { NextPage } from "next";
import React from "react";
import Logo from "../components/Logo";
import LandingCard from "../components/LandingCard";
import DogFaceIcon from "../components/icons/DogFaceIcon";
import PoodleIcon from "../components/icons/PoodleIcon";
import { IconSize } from "../components/icons";
import useClassificationSetup from "../hooks/useClassificationSetup";
import LoadingSplash from "../components/LoadingSplash";

import pageStyles from "../styles/Page.module.scss";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const loading = useClassificationSetup();
  if (loading) {
    return <LoadingSplash />;
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
