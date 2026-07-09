import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployCounter: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log("====================");
  console.log(`Deployed Network: ${hre.network.name}`);
  console.log("====================");

  console.log("Deploying Counter with account:", deployer);

  const counter = await deploy("Counter", {
    contract: "Counter",
    args: [],
    from: deployer,
    log: true,
    autoMine: true,
    skipIfAlreadyDeployed: false,
  });

  console.log(`Counter deployed successfully at address: ${counter.address}`);
};

deployCounter.tags = ["Counter", "deploy"];
export default deployCounter;
