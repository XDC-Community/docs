import Web3 from "web3";
import { AbiItem } from 'web3-utils';
import { Contract as Web3Contract } from "web3-eth-contract";

class Contract {
  web3: Web3;
  chainId: number;
  account: string | null;
  tag: string | null;
  events: object;
  contract: Web3Contract;

  constructor(options, tag: string, abi, address: string) {
    this.web3 = options.web3;
    this.chainId = options.chainId;
    this.account = options.account;

    this.contract = new this.web3.eth.Contract(abi as AbiItem[], address);

    if (tag) this.tag = tag;
    else this.tag = "contract-" + Date.now();

    this.events = {};
  }
  
  call(method, ...params) {
    return new Promise((resolve, reject) => {
      this.contract.methods[method](...params).call({from: this.account})
        .then(resolve)
        .catch(reject)
    });
  }

  send(method, options, ...params) {
    return new Promise((resolve, reject) => {
      this.contract.methods[method](...params).send({...options, from: this.account})
        .then(resolve)
        .catch(reject)
    });
  }

  on(event, callback, onerr) {
    if (this.events[event])
      return;
    this.contract.events[event]((err, res) => {
      if (err === null) {
        callback(res.returnValues, this.tag);
      } else {
        if (onerr) onerr(err);
        else console.log(err);
      }
    });
    this.events[event] = true;
  }
}

export default Contract;