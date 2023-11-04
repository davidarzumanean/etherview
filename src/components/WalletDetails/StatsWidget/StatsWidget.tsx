import {walletActions, walletSelectors} from "../../../redux/wallet.slice";
import {
  EthereumIcon,
  WalletIcon,
  PiggyBankIcon, DollarSackIcon,
} from "../../../assets";
import {useEffect} from "react";
import {formatAsUSD} from "../../../utils/utils";
import {TruncatedText} from "../../TruncatedText";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {StatData} from "./StatData";
import styles from './StatsWidget.module.scss';

export const StatsWidget = () => {
  const {address, balance} = useAppSelector(walletSelectors.getWalletInfo);
  const eth = useAppSelector(walletSelectors.ethData);
  const {price} = eth;
  const dispatch = useAppDispatch();

  const data = [
    {
      icon: <EthereumIcon/>,
      title: 'Eth price',
      value: <StatData value={`${formatAsUSD(parseInt(price.ethusd))}`} reqStatus={eth.status} />,
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
        value: <StatData value={`${formatAsUSD(parseInt(balance) * parseInt(price.ethusd))}`} reqStatus={eth.status} />,
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
