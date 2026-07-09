import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config({ debug: true });

async function main() {
  const provider = new ethers.JsonRpcProvider(
    process.env.SEPOLIA_RPC_URL || "",
  );

  const wallet = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY || "", provider);

  const abi = [
    "function mint(address to) external",
    "function ownerOf(uint256 tokenId) external view returns (address)",
    "function nextTokenId() external view returns (uint256)",
  ];

  const contractAddress = "0x9eA4eb0155033Ea0CAa8Bf34aC99f5B650ABC5d3";

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  const currentTokenId = await contract.nextTokenId();
  console.log(
    `Minting NFT with TokenId #${currentTokenId} for wallet ${wallet.address}...`,
  );

  const tx = await contract.mint(wallet.address);
  console.log(`Transaction sent. Tx Hash: ${tx.hash}`);

  console.log("Waiting for transaction confirmation...");
  await tx.wait();
  console.log("NFT minted successfully!");

  const owner = await contract.ownerOf(currentTokenId);
  console.log(`Owner of NFT #${currentTokenId} (ownerOf): ${owner}`);
}

main().catch(console.error);
