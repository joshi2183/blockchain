import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';
const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xb115df0A83F02b68f9142490aeDa24071299942C'
);

export default instance;
