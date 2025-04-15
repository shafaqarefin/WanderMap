import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy;Copyright {new Date().getFullYear()} by Shafaq Arefin Chowdhury
      </p>
    </footer>
  );
}

export default Footer;
