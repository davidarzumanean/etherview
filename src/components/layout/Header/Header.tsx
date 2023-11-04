import {AddressSearch} from "../../AddressSearch";
import {EthereumIcon} from '../../../assets';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className='main-container'>
        <div className={styles.header}>
          <div className={styles.logo}>
            <EthereumIcon/>
            Etherview
          </div>
          <AddressSearch/>
        </div>
      </div>
    </header>
  );
}
