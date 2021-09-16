// @ts-nocheck
import {HardhatUserConfig} from "hardhat/types";
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'dotenv/config';
import "hardhat-gas-reporter";
import * as accounts from "./scripts/json/accounts.json"

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {enabled: true, runs: 200},
      evmVersion: 'istanbul',
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    rinkeby: {
      url: process.env['ETH_NODE_URI_RINKEBY'] || "",
      accounts: accounts.accounts,
    },
    arbitrum_testnet: {
      url: process.env['ETH_NODE_URI_ARBITRUM_TESTNET'] || "",
      accounts: accounts.accounts,
    },
    arbitrum: {
      url: process.env['ETH_NODE_URI_ARBITRUM'] || "",
      accounts: accounts.accounts,
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
}

export default config;
