import type {FC, ReactElement} from "react";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import styles from './Layout.module.scss';

export const Layout: FC<{ children: ReactElement }> = ({children}) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.contentContainer}>
        {children}
      </div>
      <Footer />
    </div>
  );
}