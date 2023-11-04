import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getBlockchainData, getEtherPrice} from "../api/api";
import {PER_PAGE, RequestStatus, SortOptions} from "../types";
import type {ethPriceType} from "../types";
import Web3Helper from "../utils/web3Helper";

interface IWalletState {
  info: {
    address: string;
    balance: string | null;
    error: string;
    status: RequestStatus;
  }
  ethData: {
    price: ethPriceType;
    status: RequestStatus;
  };
  transactions: {
    data: any[];
    status: RequestStatus;
  };
  transactionsPagination: {
    isLastPage: boolean;
    page: number;
    sort: SortOptions;
    perPage: number;
  };
}

const initialState: IWalletState = {
  info: {
    address: '',
    balance: null,
    error: '',
    status: RequestStatus.IDLE,
  },
  ethData: {
    price: {
      ethbtc: '',
      ethbtc_timestamp: '',
      ethusd: '',
      ethusd_timestamp: '',
    },
    status: RequestStatus.IDLE,
  },
  transactions: {
    data: [],
    status: RequestStatus.IDLE,
  },
  transactionsPagination: {
    isLastPage: false,
    page: 0,
    sort: SortOptions.DESC,
    perPage: PER_PAGE,
  },
};

const getEthData = createAsyncThunk(
  'wallet/getEthData',
  async (_, thunkAPI) => {
    return await getEtherPrice();
  }
)

const getEthBalance = createAsyncThunk(
  'wallet/getEthBalance',
  async (address: string, thunkAPI) => {
    const web3 = new Web3Helper();
    return await web3.getEthBalance(address)
  }
)

const fetchTransactions = createAsyncThunk(
  'wallet/fetchTransactions',
  async (address: string, thunkAPI) => {
    const state = thunkAPI.getState() as { wallet: IWalletState };
    const { sort, page, perPage } = state.wallet.transactionsPagination;
    const nextPage = page + 1;
    thunkAPI.dispatch(walletActions.setPage(nextPage));
    const res = await getBlockchainData({ address, sort, page: nextPage, perPage });
    return {
      transactions: res,
      address,
    }
  }
)

const toggleSort = createAsyncThunk(
  'wallet/toggleSort',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { wallet: IWalletState };
    const { sort, page } = state.wallet.transactionsPagination;
    const {address } = state.wallet.info;
    const newSort = sort === SortOptions.ASC ? SortOptions.DESC : SortOptions.ASC;

    const res = await getBlockchainData({ address, sort: newSort, page: 1, perPage: page * PER_PAGE });

    return {
      transactions: res,
      sort: newSort,
    }
  }
)

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.info.error = '';
      state.info.address = action.payload;
    },
    setBalance: (state, action: PayloadAction<string | null>) => {
      state.info.balance = action.payload;
    },
    setTransactions: (state, action: PayloadAction<any[]>) => {
      state.transactions.data = action.payload;
    },
    addTransactions: (state, action: PayloadAction<any[]>) => {
      state.transactions.data = state.transactions.data.concat(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.info.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.transactionsPagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      const { address, transactions } = action.payload;
      if (state.info.address !== address) {
        state.transactions.data = transactions;
      } else {
        state.transactions.data = state.transactions.data.concat(transactions);
        if (!transactions.length) {
          // we do this because the API has no data about total items count
          state.transactionsPagination.isLastPage = true;
        }
      }
      state.transactions.status = RequestStatus.IDLE;
    })
    builder.addCase(fetchTransactions.pending, (state) => {
      state.transactions.status = RequestStatus.LOADING;
    })
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.transactions.status = RequestStatus.ERROR;
      state.info.error = action.error.message || '';
    })
    builder.addCase(toggleSort.fulfilled, (state, action) => {
      const {sort, transactions} = action.payload;
      state.transactionsPagination.sort = sort;
      state.transactions.data = transactions;
    })
    builder.addCase(getEthBalance.fulfilled, (state, action) => {
      state.info.balance = action.payload;
    })
    builder.addCase(getEthBalance.pending, (state) => {
      state.info.status = RequestStatus.LOADING;
    })
    builder.addCase(getEthData.fulfilled, (state, action) => {
      state.ethData.price = action.payload;
      state.ethData.status = RequestStatus.IDLE;
    })
    builder.addCase(getEthData.pending, (state) => {
      state.ethData.status = RequestStatus.LOADING;
    })
  },
});

export const walletActions = {
  fetchTransactions,
  toggleSort,
  getEthBalance,
  getEthData,
  ...walletSlice.actions,
};

export const walletSelectors = {
  getWalletInfo: (state: { wallet: IWalletState }) => state.wallet.info,
  getTransactions: (state: { wallet: IWalletState }) => state.wallet.transactions,
  transactionsPagination: (state: { wallet: IWalletState }) => state.wallet.transactionsPagination,
  ethData: (state: { wallet: IWalletState }) => state.wallet.ethData,
}

export default walletSlice.reducer;
