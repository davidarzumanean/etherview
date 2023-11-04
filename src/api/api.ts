import axios from "axios";
import type {ethPriceType} from "../types";
import {PER_PAGE, SortOptions} from "../types";

export const getBlockchainData = async ({address, sort = SortOptions.DESC, page = 1, perPage = PER_PAGE}: {address: string, sort?: SortOptions, page?: number, perPage?: number}): Promise<object[]> => {
  try {
    const res = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=${sort}&page=${page}&offset=${perPage}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    );

    return res.data.result;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const getEtherPrice = async (): Promise<ethPriceType> => {
  try {
    const res = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    );

    return res.data.result;
  } catch (e: any) {
    throw new Error(e);
  }
}
