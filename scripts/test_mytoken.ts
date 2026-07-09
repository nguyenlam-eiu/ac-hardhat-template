import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL || "");

  const abi = [
    "function balanceOf(address account) external view returns (uint256)",
    "function decimals() external view returns (uint8)",
    "function symbol() external view returns (string)"
  ];

  const contractAddress = "0xBEf53430Bb2EB3b60516a6915246222Cd6d6D51f";

  const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY || "", provider);
  const deployerAddress = wallet.address;

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const balance = await contract.balanceOf(deployerAddress);
  const decimals = await contract.decimals();
  const symbol = await contract.symbol();

  const formattedBalance = ethers.formatUnits(balance, decimals);

  console.log(`Balance of Deployer (${deployerAddress}): ${formattedBalance} ${symbol}`);
}

main().catch(console.error);
