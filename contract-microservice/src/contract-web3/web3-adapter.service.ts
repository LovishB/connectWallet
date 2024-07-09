import { Inject, Injectable } from '@nestjs/common';
import Web3 from 'web3';

@Injectable()
export class Web3AdapterService {
    private contract;

    constructor(
        @Inject('Web3')
        private readonly web3: Web3,
        @Inject('Config')
        private readonly config: { wallet: string; privateKey: string; contractAbi: any; contractAddress: string },
    ) {
        this.contract = new this.web3.eth.Contract(this.config.contractAbi, this.config.contractAddress);
    }

    async sendTransaction(data: any): Promise<string> {
        //getting nonce value from wallet
        const nonce = await this.web3.eth.getTransactionCount(
            this.config.wallet,
            'latest',
        );
        // Fetch the current gas price
        const gasPrice = await this.web3.eth.getGasPrice();
        //creating transaction object
        const tx = {
            from: this.config.wallet,
            to: this.config.contractAddress,
            data: data,
            gas: 5000000,
            gasPrice: gasPrice,
            nonce,
        };
        //signing the transaction
        const signedTx = await this.web3.eth.accounts.signTransaction(
            tx, 
            this.config.privateKey
        );
        console.log(signedTx.transactionHash.toString());
        //sending transaction
        const result = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(result.status.toString());
        return result.status.toString();
    }

    addition(num1: number, num2: number): Promise<string> {
        const data = this.contract.methods.add(num1, num2).encodeABI();
        return this.sendTransaction(data); //calling method add while sending a transaction
    }

    subtraction(num1: number, num2: number): Promise<string> {
        const data = this.contract.methods.sub(num1, num2).encodeABI();
        return this.sendTransaction(data);//calling method sub while sending a transaction
    }

    async multiplication(num1: number, num2: number): Promise<string> {
        const result = await this.contract.methods.multiply(num1, num2).call(); //only calling method
        return result.toString();
    }
}
