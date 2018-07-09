"use strict"

const ganache = require('ganache-cli');
const Web3 = require('web3');
const assert = require('assert');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;

let campaignAddress;
let campaign;

beforeEach(async function() {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
            .deploy({data:compiledFactory.bytecode})
            .send({from: accounts[0], gas: '1000000'});
  await factory.methods.createCampaign('100').send({
    from:accounts[0],
    gas:1000000
  });

  const addresses = await factory.methods.getDeployedCampaigns().call();
  console.log("address : ",addresses[0]);

  //campaignAddress = addresses[0];
  // [campaignAddress]= await factory.methods.getDeployedCampaigns().call();
  // campaign = await new web3.eth.Contract(
  //   JSON.parse(compiledCampaign.interface),
  //   campaignAddress
  // );
});

describe('campaigns', () => {
  it('deploys a factory and a campaign',() => {
    assert.ok(factory.options.address);
    //assert.ok(campaign.options.address);
  });
});

 //  it('marks caller as campaign manager', async () =>{
 //    const manager = await campaign.methods.manager().call();
 //    assert.equal(accounts[0],manager);
 //  });
 //
 //  it('allows people to contribute money and marks as approver', async () =>{
 //    await campaign.methods.contribute().send({
 //      value : '200',
 //      from : accounts[1]
 //    });
 //
 //    const isContributer = await campaign.methods.approvers(accounts[1]).call();
 //    assert(isContributer);
 //
 //  });
 //
 //  it('requires minimum contribution', async () =>{
 //    try{
 //
 //      await campaign.methods.contribute().send({
 //        value : '199',
 //        from : accounts[1]
 //      });
 //
 //      console.log("before assert false")
 //      assert(false);
 //    } catch(err){
 //      assert(err);
 //    }
 //
 //  });
 //
 //  it('allows manager to make a paymnet request', async () =>
 //  {
 //    await campaign.methods
 //      .createRequest("buy batteries",'100',accounts[1])
 //      .send({
 //        from: accounts[0],
 //        gas : '1000000'
 //      });
 //    const request = await campaign.methods.requests(0).call();
 //
 //    assert.equal("buy batteries",request.description);
 //
 //  });
 //
 // // this test is not working due to bigNumbder dependancies.
 //  it('processes request', async () => {
 //    await campaign.methods.contribute().send({
 //      from:accounts[0],
 //      value:web3.utils.toWei('10','ether')
 //    });
 //
 //    await campaign.methods
 //      .createRequest('A',web3.utils.toWei('5','ether'),accounts[1])
 //      .send({
 //        from:accounts[0],
 //        gas : '1000000'
 //      });
 //
 //    await campaign.methods.approveRequest(0).send({
 //      from:accounts[0],
 //      gas:'1000000'
 //    });
 //
 //    await campaign.methods.finalize(0).send({
 //      from:accounts[0],
 //      gas:'1000000'
 //    });
 //
 //    // let balanceAccount1 = web3.eth.getBalance(accounts[1]);
 //    // console.log('if balance is big number:', web3.utils.isBigNumber(balanceAccount1))
 //    // balanceAccount1 = web3.utils.fromWei(balanceAccount1,'ether');
 //    // balanceAccount1 = parseFloat(balanceAccount1);
 //    // console.log(balanceAccount1);
 //    // assert(balanceAccount1 > 104)
 //
 //    const balance = await campaign.methods.totalContribution().call();
 //
 //    assert.equal(5000000000000000000,balance);
 //
 //
 //  });


});
