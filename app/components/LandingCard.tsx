import Link from "next/link";
import { ReactElement } from "react";

import styles from "../styles/LandingCard.module.scss";

export interface ILandingCardProps {
  variant: "upload" | "gallery";
  icon: ReactElement<any>;
}

const LandingCard = ({ icon, variant }: ILandingCardProps) => {
  const isUpload = variant === "upload";
  return (
    <Link href={isUpload ? "/upload" : "/gallery"}>
      <a
        className={`${styles.wrapper} ${
          isUpload ? styles.wrapperUpload : styles.wrapperGallery
        }`}
      >
        <section>
          {icon}
          <h2 className={styles.title}>
            {isUpload ? "Upload photo" : "Show me doggos"}
          </h2>
          <p>
            {isUpload
              ? "Upload a photo of your mystery boy to see what breeds they might be"
              : "See a number of mystery boys who have been classified as different breeds"}
          </p>
        </section>
      </a>
    </Link>
  );
};

export default LandingCard;
