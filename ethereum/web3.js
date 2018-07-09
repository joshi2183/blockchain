import Web3 from 'web3';

// assumption is metamask is installed in browser already
//const web3 = new Web3(window.web3.currentProvider);

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on server  or user is not runniing metamask

  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/ryjI7X9tHEO3coLK8fwG'
  );
  web3 = new Web3(provider);
}

export default web3;
