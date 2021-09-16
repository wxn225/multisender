// @ts-ignore
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import * as data from './json/multisend.json'



async function main() {

    const multiSender = await ethers.getContract("MultiSender");

    // Modify this address to the erc20 you want to use
    const sendingErc20 = "0xc778417e063141139fce010982780140aa0cd5ab";
    const abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
    ]
    const erc20Contract = await ethers.getContractAt(abi, sendingErc20)

    // may comment this part if approve is enough for the second execution
    const tx0 = await erc20Contract.approve(multiSender.address, BigNumber.from("100000000000000000000000"));
    await tx0.wait();

    const accounts = data.accounts
    const values = data.values

    const tx = await multiSender.erc20Send(sendingErc20, accounts, values);
    await tx.wait();
    console.log("send succeeded");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
