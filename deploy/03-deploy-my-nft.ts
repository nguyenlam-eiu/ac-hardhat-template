import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMyNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying MyNFT with account:", deployer);

  const myNFTDeployment = await deploy("MyNFT", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log(`MyNFT deployed successfully at address: ${myNFTDeployment.address}`);

  const myNFTContract = await ethers.getContractAt("MyNFT", myNFTDeployment.address);

  console.log("Minting 1st NFT for deployer...");
  const mintTx = await myNFTContract.mint(deployer);
  await mintTx.wait();
  console.log("Mint successfully!");

  const nftOwner = await myNFTContract.ownerOf(0);
  console.log(`Owner of NFT #0 (ownerOf(0)): ${nftOwner}`);
};

deployMyNFT.tags = ["MyNFT", "deploy"];
export default deployMyNFT;
