import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Logo from "../components/Logo";
import LandingCard from "../components/LandingCard";
import DogFaceIcon from "../components/icons/DogFaceIcon";
import PoodleIcon from "../components/icons/PoodleIcon";
import { IconSize } from "../components/icons";

import pageStyles from "../styles/Page.module.scss";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <main className={`${pageStyles.wrapper} ${styles.wrapper}`}>
      <Head>
        <title>whosagoodboy</title>
      </Head>
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
