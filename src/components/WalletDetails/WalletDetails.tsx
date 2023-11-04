import React, {useCallback, useEffect, useState} from "react";
import {walletActions, walletSelectors} from "../../redux/wallet.slice";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RequestStatus, SortOptions} from "../../types";
import {timestampToDaysAndHours, weiToUSD} from "../../utils/utils";
import {Table, TableSkeleton} from "../Table";
import {TruncatedText} from "../TruncatedText";
import {Button} from "../form";
import {StatsWidget} from "./StatsWidget/StatsWidget";
import {AscIcon, DescIcon} from "../../assets";
import {Badge} from "../Badge";
import styles from './WalletDetails.module.scss';

export const WalletDetails = () => {
  const [tableData, setTableData] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  const eth = useAppSelector(walletSelectors.ethData);
  const {address} = useAppSelector(walletSelectors.walletInfo);
  const error = useAppSelector(walletSelectors.error);
  const transactions = useAppSelector(walletSelectors.transactions);
  const transactionsPagination = useAppSelector(walletSelectors.transactionsPagination);

  const isCurrentAddress = (trAddress: string) => {
    if (!trAddress || !address) return false;
    return trAddress.toLowerCase() === address.toLowerCase();
  }

  const getTableData = useCallback(() => {
    return transactions.data.map((tx) => ({
      transactionHash: {
        label: 'Transaction Hash',
        value: <TruncatedText text={tx.hash} href={`https://etherscan.io/tx/${tx.hash}`}/>,
      },
      from: {
        label: 'From',
        value: (
          <div style={{display: 'flex', gap: '30px'}}>
            <TruncatedText text={tx.from} href={`https://etherscan.io/address/${tx.from}`}/>
            <>
              {isCurrentAddress(tx.to) ?
                (<Badge variant={'success'}>IN</Badge>) :
                (<Badge variant={'warning'}>OUT</Badge>)}
            </>
          </div>
        ),
      },
      to: {
        label: 'To',
        value: <TruncatedText text={tx.to} href={`https://etherscan.io/address/${tx.to}`}/>,
      },
      timestamp: {
        label: 'Age',
        value: <div className='nowrap'>{timestampToDaysAndHours(parseInt(tx.timeStamp))}</div>,
      },
      value: {
        label: 'Value',
        value: <div>{weiToUSD(tx.value, parseInt(eth.price.ethusd))}</div>,
      },
      confirmations: {
        label: 'Confirmations',
        value: <div>{tx.confirmations}</div>,
      },
    }));
  }, [transactions])

  useEffect(() => {
    setTableData(getTableData());
  }, [getTableData, transactions]);

  const toggleSort = async () => {
    dispatch(walletActions.toggleSort());
  }

  const loadMore = async () => {
    dispatch(walletActions.fetchTransactions(address))
  }

  if (error) {
    return (
      <div className='main-container error'>
        <h2>Error</h2>
        <p>{error}</p>
        <img
          src='https://media3.giphy.com/media/VL48WGMDjD64umCEkv/giphy.gif?cid=ecf05e47tiu8midcid2djl72s45bqlcztt3pjfs47gbkm3kr&ep=v1_gifs_search&rid=giphy.gif&ct=g'
          alt='Try again'/>
      </div>
    );
  }

  return (
    <div className={`main-container ${styles.walletDetails}`}>
      <StatsWidget/>

      {
        address &&
        (
          <div className={styles.tableContainer}>
            <div className={styles.tableContainerHeader}>
              <Button onClick={toggleSort} className={styles.sortButton}>
                {transactionsPagination.sort === SortOptions.DESC ? <><DescIcon/> Descending</> : <><AscIcon/> Ascending</>}
              </Button>
            </div>
            <div className={styles.tableWrapper}>
              {transactions.status === RequestStatus.LOADING && transactions.data.length === 0
                ?
                <TableSkeleton/>
                :
                <Table data={tableData}/>
              }
            </div>
            <div className={styles.tableContainerFooter}>
              {!transactionsPagination.isLastPage && transactions.status === RequestStatus.IDLE &&
                  <Button onClick={loadMore} className={styles.loadMoreButton}>Load More</Button>}
            </div>
          </div>
        )
      }
    </div>
  );
}