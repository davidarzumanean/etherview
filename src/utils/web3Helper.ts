import Web3 from 'web3';

class Web3Helper {
  private web3!: Web3;
  public utils!: typeof Web3.utils;
  private static instance: Web3Helper | null = null;

  constructor(infuraUrl = `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`) {
    if (!Web3Helper.instance) {
      this.web3 = new Web3(infuraUrl);
      this.utils = Web3.utils;
      Web3Helper.instance = this;
    }

    return Web3Helper.instance;
  }

  getWeb3(): Web3 {
    return this.web3;
  }

  async getEthBalance(address: string): Promise<string> {
    try {
      const weiBalance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(weiBalance, 'ether');
    } catch (error) {
      console.error('Error fetching Ethereum balance:', error);
      throw error;
    }
  }
}

export default Web3Helper;
