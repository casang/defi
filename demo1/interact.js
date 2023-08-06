//var Web3 = require('web3');
const { Web3 } = require('web3');
const Provider = require('@truffle/hdwallet-provider');

var SmartContractAddress = "0x49F155afC567Ca4b19f73C008d4e01Cf574ab271";
var CompiledContract = require('./artifacts/contracts/LockAndWithdrawHalf.sol/LockAndWithdrawHalf.json')
var SmartContractABI = CompiledContract.abi;

var address = process.env.SEPOLIA_ACCOUNT_ADDRESS;
var privatekey = process.env.PRIVATE_KEY_METAMASK;
var rpcurl = process.env.SEPOLIA_URL;

//var rpcurl = "https://eth-sepolia.g.alchemy.com/v2/aPk4wTN-leqUZzoxvpQff7kfZPC-YI1X";
//var address = "0x1A920367Fa6dE3202ceD1038cb9382ea76918F1B";

const withdrawMyFunds = async () => {
    var provider = new Provider(privatekey, rpcurl);
    var web3 = new Web3(provider);
    var myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);
    var owner = await myContract.methods.owner().call();
    var unlockTime = await myContract.methods.unlockTime().call();

    console.log("Owner address", owner);
    //console.log("Unlock time",  new Date(BigInt(unlockTime * BigInt(1000))).toLocaleString());
  
    console.log("Initial wallet balance", await getCurrentBalanceInETH(), 'GWEI');
    var receipt = await myContract.methods.withdrawHalf().send({ from: address });
    console.log(receipt);
    console.log("\nFinal wallet balance", await getCurrentBalanceInETH(), 'GWEI');
    process.exit(0);
    
    async function getCurrentBalanceInETH() {
        const balance = await web3.eth.getBalance(address);
        return convertToETH(balance);
    }

    function convertToETH(gwei) {
        return gwei;
    }
  }
  
  withdrawMyFunds();