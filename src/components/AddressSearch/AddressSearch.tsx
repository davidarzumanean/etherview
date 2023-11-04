import type {ChangeEvent, FormEvent} from "react";
import {useCallback, useEffect, useMemo, useState} from "react";
import {walletSelectors, walletActions} from "../../redux/wallet.slice";
import {getQueryParam, setUrlQuery} from "../../utils/utils";
import Web3Helper from "../../utils/web3Helper";
import {SearchInput} from "../form";
import './AddressSearch.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

export const AddressSearch = () => {
  const [addressValue, setAddressValue] = useState('')
  const dispatch = useAppDispatch();
  const walletInfo = useAppSelector(walletSelectors.getWalletInfo);
  const walletAddress = walletInfo.address;

  const {setAddress, setError} = walletActions;

  const web3 = useMemo(() => {
    return new Web3Helper();
  }, []);

  const fetchWalletData = useCallback(async (address: string) => {
    try {
      dispatch(walletActions.getEthBalance(address));
      dispatch(walletActions.fetchTransactions(address));
    } catch (error) {
      console.error('Error fetching blockchain data:', error);
    }
  }, [dispatch]);

  const getUrlAddressData = useCallback(async () => {
    const addressParam = getQueryParam('address');

    if (addressParam) {
      dispatch(setAddress(addressParam));
      setAddressValue(addressParam);

      if (web3.utils.isAddress(walletAddress)) {
        await fetchWalletData(walletAddress);
      } else {
        dispatch(setError(`${walletAddress} is not a valid wallet address`))
      }
    }
  }, [dispatch, fetchWalletData, setAddress, setError, walletAddress, web3])

  useEffect(() => {
    getUrlAddressData().catch(console.error);
  }, [getUrlAddressData, walletAddress]);

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressValue(e.target.value.trim());
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addressValue.length) {
      dispatch(setAddress(addressValue));
      setUrlQuery({param: 'address', value: addressValue});
    }
  }

  return (
    <SearchInput onSubmit={onSubmit} value={addressValue} handleChange={handleAddressChange} placeholder='Search by address' />
  )
}