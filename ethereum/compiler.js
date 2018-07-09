const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// delete entire build folder if exists
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// read campaign from contracts folder
const campaignPath = path.resolve(__dirname, 'contracts','Campaign.sol');
const source = fs.readFileSync(campaignPath,'utf8');

// it contains two contracts campiagnfactory and campaign
const output = solc.compile(source,1).contracts;

// checks if folder exists othewise creates it
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath,contract.replace(':','') + '.json'),
    output[contract]
  );
}
