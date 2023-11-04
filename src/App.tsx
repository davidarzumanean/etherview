import React from 'react';
import {Layout} from "./components/layout";
import {WalletDetails} from "./components/WalletDetails";

const EthereumDataDisplay: React.FC = () => {
  return (
    <Layout>
      <WalletDetails />
    </Layout>
  );
};

export default EthereumDataDisplay;
