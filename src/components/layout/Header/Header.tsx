import {AddressSearch} from "../../AddressSearch";
import {EthereumIcon, MoonIcon, SunIcon} from '../../../assets';
import styles from './Header.module.scss';
import {Button} from "../../form";
import {useEffect, useState} from "react";

enum Theme {
  light = 'light',
  dark = 'dark',
}

export const Header = () => {
  const [theme, setTheme] = useState<Theme>(Theme.light);

  const toggleTheme = () => {
    if (theme === Theme.light) {
      setTheme(Theme.dark);
      localStorage.setItem('theme', Theme.dark);
    } else {
      setTheme(Theme.light);
      localStorage.setItem('theme', Theme.light);
    }
  }
  console.log(theme);

  const getTheme = () => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme as Theme);
    }
  }

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {
    if (theme === Theme.dark) {
      document.body.classList.add(Theme.dark);
    } else {
      document.body.classList.remove(Theme.dark);
    }
  }, [theme]);

  return (
    <header className={styles.headerContainer}>
      <div className='main-container'>
        <div className={styles.header}>
          <div className={styles.logo}>
            <EthereumIcon/>
            Etherview
          </div>
          <div className={styles.headerRight}>
            <AddressSearch/>
            <Button className={styles.iconButton} onClick={toggleTheme}>
              {theme === Theme.light ?
                <MoonIcon /> :
                <SunIcon />
              }
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
