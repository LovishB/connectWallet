import { Inject, Injectable } from '@nestjs/common';
import { Web3js } from 'nestjs-web3js';
import Web3 from 'web3';

@Injectable()
export class NestJSWeb3Adapter {

    //This is demostration of how to use nestjs-web3 lib

    constructor(
        @Inject('Config') private readonly config: { wallet: string; privateKey: string },
        @Web3js() private readonly web3: Web3,
    ) {}

    async getBalance() {
        const walleBalance =  await this.web3.eth.getBalance(this.config.wallet);
        return this.web3.utils.fromWei(walleBalance, 'ether').toString();
    }

    async getLatestBlockNumber() {
        const latestBlock = await this.web3.eth.getBlockNumber();
        return latestBlock.toString();
    }

    async transfer() {
        //getting latest nounce from wallet(cronology of transaction)
        const nonce = await this.web3.eth.getTransactionCount(
            this.config.wallet,
            'latest',
        );
        console.log(`nonce from wallet: ${nonce}`);
        const gasPrice = await this.web3.eth.getGasPrice(); // Fetch the current gas price
        const transaction = {
            to: '0x3cdd051eeC909f94965F9c1c657f5b70a172B2C0',
            value: await this.web3.utils.toWei((0.2 * 0.005).toString(), 'ether'),
            gas: 21000,
            gasPrice: gasPrice,
            nonce: nonce,
        };
        //signing the transaction using private key
        const signedTx = await this.web3.eth.accounts.signTransaction(
            transaction,
            this.config.privateKey,
        );
        console.log(`Sign: ${signedTx.transactionHash}`);
        //sending transaction
        const tx = await this.web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
        );
      
        //returning transaction hash  
        return tx.transactionHash.toString();
        
    }

}
