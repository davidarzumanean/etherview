import {walletActions, walletSelectors} from "../../../redux/wallet.slice";
import {DollarSackIcon, EthereumIcon, PiggyBankIcon, WalletIcon,} from "../../../assets";
import {useEffect} from "react";
import {formatAsUSD} from "../../../utils/utils";
import {TruncatedText} from "../../TruncatedText";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {StatData} from "./StatData";
import styles from './StatsWidget.module.scss';
import {RequestStatus} from "../../../types";

export const StatsWidget = () => {
  const {address, balance, status} = useAppSelector(walletSelectors.walletInfo);
  const eth = useAppSelector(walletSelectors.ethData);
  const {price} = eth;
  const dispatch = useAppDispatch();

  const getFormattedEthPrice = () => {
    if (!price.ethusd) return 'N/A';
    return formatAsUSD(parseInt(price.ethusd));
  }

  const getWalletValue = () => {
    if (status === RequestStatus.LOADING) return '';
    if (!balance || !price.ethusd) return 'N/A';
    return formatAsUSD(parseInt(balance) * parseInt(price.ethusd));
  }

  const data = [
    {
      icon: <EthereumIcon/>,
      title: 'Eth price',
      value: <StatData value={getFormattedEthPrice()} reqStatus={eth.status} />,
    },
    ...(balance ? [
      {
        icon: <PiggyBankIcon/>,
        title: 'Balance',
        value: <StatData value={`Ξ${balance}`} reqStatus={eth.status} />
      },
      {
        icon: <DollarSackIcon/>,
        title: 'Value',
        value: <StatData value={getWalletValue()} reqStatus={eth.status} />,
      },
      {
        icon: <WalletIcon/>,
        title: 'Address',
        value: <TruncatedText text={address} />
      }
    ] : [])
  ]

  useEffect(() => {
    dispatch(walletActions.getEthData());
  }, [dispatch]);

  return (
    <div className={styles.statsWidget}>
      {
        data.map((item) => (
          <div className={styles.statsWidgetItem} key={item.title}>
            <div className={styles.statsWidgetItemIcon}>
              {item.icon}
            </div>
            <div className={styles.statsWidgetItemTitle}>
              {item.title}
            </div>
            <div className={styles.statsWidgetItemValue}>
              {item.value}
            </div>
          </div>
        ))
      }
    </div>
  )
}
