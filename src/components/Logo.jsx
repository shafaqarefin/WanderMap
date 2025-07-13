import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.logoText}>
        Wander<span className={styles.map}>Map</span>
      </span>
    </Link>
  );
}

export default Logo;
