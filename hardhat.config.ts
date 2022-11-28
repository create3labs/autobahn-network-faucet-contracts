import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-etherscan';

const config: HardhatUserConfig = {
  etherscan: {
    apiKey: 'abc',
    customChains: [
      {
        network: 'autobahn',
        chainId: 45_000,
        urls: {
          apiURL: 'https://api.autobahn-explorer.com/api',
          browserURL: 'https://autobahn-explorer.com',
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    autobahn: {
      url: 'https://autobahn-rpc.com',
      accounts: process.env.PK ? [`0x${process.env.PK}`] : [],
    },
  },
  solidity: '0.8.17',
};

export default config;
