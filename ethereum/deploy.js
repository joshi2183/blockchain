const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'neutral emerge defense blood patrol carry bar achieve sample typical ethics where',
  'https://rinkeby.infura.io/ryjI7X9tHEO3coLK8fwG'
);

const web3 = new Web3(provider);

const deploy = async function(){
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account : ", accounts[0]);
  const factory = await new web3.eth.Contract(
   JSON.parse(compiledFactory.interface),
   '0xb115df0A83F02b68f9142490aeDa24071299942C'
  );

  // const factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  //    .deploy({data : compiledFactory.bytecode})
  //    .send({from:accounts[0], gas:'1000000'});

  console.log("Address where the contract is deployed : ",factory.options.address);

  await factory.methods.createCampaign('100').send({
    from:accounts[0],
    gas:'1000000'
  });

  const [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
  console.log("Address of campaign :", campaignAddress);

};

deploy();
