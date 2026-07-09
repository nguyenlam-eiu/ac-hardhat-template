import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployMyToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("Deploying MyToken with account:", deployer);

  const myToken = await deploy("MyToken", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  console.log(`MyToken deployed successfully at address: ${myToken.address}`);
};

deployMyToken.tags = ["MyToken", "deploy"];
export default deployMyToken;
