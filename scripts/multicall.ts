// @ts-ignore
import { run, ethers } from "hardhat";
import {BigNumber} from "ethers";
import {sign} from "crypto";

async function main() {
    const abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
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
    const address = "0xc778417e063141139fce010982780140aa0cd5ab"
    const contract = new ethers.Contract(address, abi, ethers.provider)

    // put the private keys in accounts.json
    const signers = await ethers.getUnnamedSigners()

    for (let signer of signers) {
        console.log("process for: ", await signer.getAddress())
        const contractWithSigner = contract.connect(signer)
        // replace with the correct function name
        let tx = await contractWithSigner.transfer("0x980E1BAA616B0059Eb6A59f9Dfc17Be0e3992ab6", BigNumber.from(10000000000))
        await tx.wait()
        console.log("transaction for %s succeeded", await signer.getAddress())
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
