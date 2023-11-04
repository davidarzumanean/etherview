import {EthereumIcon} from "../../../assets";
import styles from './Footer.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`main-container ${styles.content}`}>
        <div className={styles.logo}>
          <EthereumIcon/>
          Powered by ethereum
        </div>
        <div className={styles.copy}>Etherview © {year}</div>
      </div>
    </footer>
  );
}