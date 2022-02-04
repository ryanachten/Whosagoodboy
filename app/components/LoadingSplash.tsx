import Logo from "./Logo";

import styles from "../styles/LoadingSplash.module.scss";

const LoadingSplash = () => {
  return (
    <section className={styles.wrapper}>
      <img className={styles.loading} src="loading.gif" alt="loading" />
      <Logo />
    </section>
  );
};

export default LoadingSplash;
