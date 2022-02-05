import Link from "next/link";
import React from "react";
import styles from "../styles/Logo.module.scss";

export interface ILogoProps {
  className?: string;
}

const Logo = ({ className }: ILogoProps) => (
  <Link href="/">
    <a>
      <h1
        className={`${styles.logo} ${className ? className : ""}`}
        aria-label="who's a good boy"
      >
        whosagoodboy
      </h1>
    </a>
  </Link>
);

export default Logo;
