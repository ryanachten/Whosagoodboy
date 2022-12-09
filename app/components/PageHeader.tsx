import Link from "next/link";
import Logo from "./Logo";

import styles from "../styles/PageHeader.module.scss";
import DogIcon from "./icons/DogIcon";
import { IconSize } from "./icons";

const PageHeader = () => {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <div className={styles.rightWrapper}>
        <Link href="/">
          <a className={styles.homeLink}>Home</a>
        </Link>
        <DogIcon size={IconSize.SMALL} />
      </div>
    </header>
  );
};

export default PageHeader;
