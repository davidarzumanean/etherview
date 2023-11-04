export type ethPriceType = {
  ethbtc: string;
  ethbtc_timestamp: string;
  ethusd: string;
  ethusd_timestamp: string
}

export enum SortOptions {
  ASC = 'asc',
  DESC = 'desc'
}

export enum RequestStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const PER_PAGE = 10;
