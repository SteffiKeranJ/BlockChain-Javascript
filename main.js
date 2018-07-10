// import SHA256
const SHA256 = require('crypto-js/SHA256');

class Block {
    constructor(index, timestamp, data, previousHash='') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        // Hash of the block
        this.hash = this.computeHash();
    }

    // Function to calculate the hash of the block
    // to identify the block in the blockchain
    // Cast the output to a string
    computeHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    // the constructor is the initiator of the blockchain
    constructor() {
        this.chain = [this.createGenesisBlock()]; //the genesis blockchain

    }

    createGenesisBlock() {
        return new Block(0, "11/07/2018", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock){
        // hash of the previous block
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        // then add the block to the blockchain
        this.chain.push(newBlock);
    }

    //function to check the integrity of the blockchain
    checkValidBlockChain() {
        for( let i = 1; i< this.chain.length; i++) {

            //current block
            const currentBlock = this.chain[i];
            // previous block
            const previousBlock = this.chain[i-1];

            // check if the current block's previous hash matches the previous block's hash
            if(currentBlock.previousHash !== previousBlock.hash) return false;
            // check if the current block's hash matches the current block's calculated hash
            if(currentBlock.hash !== currentBlock.computeHash()) return false;
        }
        return true;
    }
}

let steffiCoin = new BlockChain();
steffiCoin.addNewBlock(new Block(1, "12/12/2020", {amount: 1}));
// add another block
steffiCoin.addNewBlock(new Block(2, "12/12/2040", {amount: 400}));

console.log(JSON.stringify(steffiCoin, null, 4));
console.log('Is BlockChain valid?' + steffiCoin.checkValidBlockChain());