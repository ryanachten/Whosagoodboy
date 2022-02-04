import styles from "../styles/Logo.module.scss";

export interface ILogoProps {
  className?: string;
}

const Logo = ({ className }: ILogoProps) => (
  <h1
    className={`${styles.logo} ${className ? className : ""}`}
    aria-label="who's a good boy"
  >
    whosagoodboy
  </h1>
);

export default Logo;
