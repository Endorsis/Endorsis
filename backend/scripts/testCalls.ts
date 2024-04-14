import { ethers } from 'hardhat';

async function main() {
  // DEPLOY CONTRACT
  // const myEventsSeeder__factory = await ethers.getContractFactory('Events');
  // const myEventsContract = await myEventsSeeder__factory.deploy();
  // await myEventsContract.waitForDeployment();
  // const myEventsAddress = await myEventsContract.getAddress();
  // console.log(`Events contract deployed at ${myEventsAddress}`);

  // GET PREVIOUSLY DEPLOYED CONTRACT USING ADDRESS
  const myEventsAddress2 = '0xeCcC3f1D9Bed269435F5737B6718Fc0F86d1b0E2';
  const myEventsContract2 = await ethers.getContractAt('Events', myEventsAddress2);

  // CALL FUNCTION newEvent
  const txNewEvent = await myEventsContract2.newEvent(
    'ETHDam',
    'A privacy focused hackathon',
    2024,
    2025,
    'myPassword',
    ['0x0D4403588DB896B37f6dAac2803eD0e9f8DDC945', '0x10D488025abAa5a2d3F30492FE3cbB5591E651dc'],
    ['deca', 'deca2'],
  );
  const receiptNewEvent = await txNewEvent.wait();

  // GET LIST OF ENDORSEES

  // CALL FUNCTION genGaslessEndorseTx... ARGS         string memory _endorsement, address _endorseeAddress, uint256 _nonce, uint256 _eventId
  // const txGenGaslessEndorseTx = await myEventsContract2.genGaslessEndorseTx(
  //   'I endorse deca2',
  //   '0x10D488025abAa5a2d3F30492FE3cbB5591E651dc',
  //   0,
  //   0,
  // );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
