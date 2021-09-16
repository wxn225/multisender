// We import Chai to use its asserting functions here.
import {expect} from "./chai-setup";


// We import the hardhat environment field we are planning to use
import {deployments, ethers, getNamedAccounts, getUnnamedAccounts} from 'hardhat';
import {BigNumber, Contract} from "ethers";
import * as data from "../scripts/json/multisend.json";


// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Multisender test", function () {
    it("send erc20", async function () {
      await deployments.fixture(["MultiSender"]);
      const multisender = await ethers.getContract("MultiSender");
      const erc20 = await (await ethers.getContractFactory('MockERC20')).deploy();
      const { deployer } = await getNamedAccounts();
      await erc20.mint(deployer, 10000);
      await erc20.approve(multisender.address, 10000);

      const accounts = await getUnnamedAccounts();
      await multisender.erc20Send(erc20.address, accounts.slice(0, 10), Array(10).fill(1000));
      const signers = await ethers.getUnnamedSigners()

      for (let i=0; i<10; i++) {
        const signer = signers[i];
        erc20.connect(signer)
        expect(await erc20.balanceOf(await signer.getAddress())).to.equal(1000);
      }
    });
  it("send eth", async function () {
    await deployments.fixture(["MultiSender"]);
    const multisender = await ethers.getContract("MultiSender");
    const { deployer } = await getNamedAccounts();

    const accounts = await getUnnamedAccounts();
    await multisender.ethSend(accounts.slice(0, 10), Array(10).fill(1000), {value: 10000});
    const signers = await ethers.getUnnamedSigners()

    console.log("success")
    for (let i=0; i<10; i++) {
      const signer = signers[i];
      console.log((await signer.getBalance()).toString());
    }
  });
});
