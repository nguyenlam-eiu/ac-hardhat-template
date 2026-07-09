import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("MyNFT", function () {
  async function deployMyNFT() {
    const [deployer, receiver] = await ethers.getSigners();
    const myNFT = await (await ethers.getContractFactory("MyNFT")).deploy();

    return { deployer, receiver, myNFT };
  }

  describe("Deployment", function () {
    it("Should set NFT metadata and owner", async function () {
      const { deployer, myNFT } = await deployMyNFT();

      expect(await myNFT.name()).to.equal("MyNFT");
      expect(await myNFT.symbol()).to.equal("MNFT");
      expect(await myNFT.owner()).to.equal(deployer.address);
      expect(await myNFT.nextTokenId()).to.equal(0n);
    });
  });

  describe("Mint", function () {
    it("Should mint the next token to the requested address", async function () {
      const { receiver, myNFT } = await deployMyNFT();

      const currentTokenId = await myNFT.nextTokenId();
      const tx = await myNFT.mint(receiver.address);
      await tx.wait();

      expect(await myNFT.ownerOf(currentTokenId)).to.equal(receiver.address);
      expect(await myNFT.nextTokenId()).to.equal(currentTokenId + 1n);
    });

    it("Should allow only the owner to mint", async function () {
      const { receiver, myNFT } = await deployMyNFT();

      let reverted = false;
      try {
        await myNFT.connect(receiver).mint(receiver.address);
      } catch (error) {
        reverted = true;
      }

      expect(reverted).to.equal(true);
    });
  });
});
