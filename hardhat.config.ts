import { task } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-verify";
import "hardhat-contract-sizer";
import "hardhat-abi-exporter";
import "hardhat-gas-reporter";
import * as dotenv from "dotenv";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomicfoundation/hardhat-ethers";
import "@typechain/hardhat";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const {
  TESTNET_PRIVATE_KEY: testnetPrivateKey,
  MAINNET_PRIVATE_KEY: mainnetPrivateKey,
  SEPOLIA_RPC_URL: sepoliaRpcUrl,
  ETHERSCAN_API: etherscanApi,
} = process.env;
const reportGas = process.env.REPORT_GAS;

const getAccounts = (privateKey: string | undefined): string[] => {
  if (!privateKey) {
    return [];
  }
  const cleanKey = privateKey.startsWith("0x") ? privateKey.slice(2) : privateKey;
  if (cleanKey.length !== 64 || !/^[0-9a-fA-F]+$/.test(cleanKey)) {
    return [];
  }
  return [privateKey.startsWith("0x") ? privateKey : `0x${privateKey}`];
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    "sepolia": {
      url: sepoliaRpcUrl || "https://ethereum-sepolia-rpc.publicnode.com",
      chainId: 11155111,
      accounts: getAccounts(testnetPrivateKey),
      timeout: 40000,
    },
    "ethereum": {
      url: "https://ethereum-rpc.publicnode.com",
      chainId: 1,
      accounts: getAccounts(mainnetPrivateKey),
      timeout: 60000,
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
          viaIR: true
        },
      }
    ],
  },
  abiExporter: {
    path: "data/abi",
    runOnCompile: true,
    clear: true,
    flat: false,
    only: [],
    spacing: 4,
  },
  gasReporter: {
    enabled: reportGas == "1",
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
  },
  etherscan: {
    apiKey: {
      mainnet: etherscanApi || "",
      sepolia: etherscanApi || "",
    }
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: false,
  },
  mocha: {
    timeout: 40000,
  },
  namedAccounts: {
    deployer: 0,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
};
