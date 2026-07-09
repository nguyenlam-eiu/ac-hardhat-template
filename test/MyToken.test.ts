import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyToken", function () {
  async function deployMyToken() {
    const [deployer] = await ethers.getSigners();
    const myToken = await (await ethers.getContractFactory("MyToken")).deploy();

    return { deployer, myToken };
  }

  describe("Deployment", function () {
    it("Should set token metadata", async function () {
      const { myToken } = await deployMyToken();

      expect(await myToken.name()).to.equal("MyToken");
      expect(await myToken.symbol()).to.equal("MTK");
      expect(await myToken.decimals()).to.equal(18n);
    });

    it("Should mint the initial supply to the deployer", async function () {
      const { deployer, myToken } = await deployMyToken();

      const decimals = await myToken.decimals();
      const expectedSupply = 1_000_000n * 10n ** decimals;

      expect(await myToken.balanceOf(deployer.address)).to.equal(expectedSupply);
      expect(await myToken.totalSupply()).to.equal(expectedSupply);
    });
  });
});
