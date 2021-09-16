// @ts-ignore
import { run, ethers } from "hardhat";
import * as data from "./json/multisend.json";

async function main() {
    const multiSender = await ethers.getContract("MultiSender");

    const accounts = data.accounts
    const values = data.values

    let totalSend = 0
    for (let value of values) {
        totalSend += value
    }

    const tx = await multiSender.ethSend(accounts, values, {value: totalSend});
    await tx.wait();
    console.log("send succeeded");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
