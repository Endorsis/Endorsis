import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('Events', function () {
  async function deployEvents() {
    const myEventsSeeder__factory = await ethers.getContractFactory('Events');
    const myEventsContract = await myEventsSeeder__factory.deploy();
    await myEventsContract.waitForDeployment();
    const myEventsAddress = await myEventsContract.getAddress();
    return myEventsAddress;
  }

  it('Should successfully deploy', async function () {
    const deployedAddress = await deployEvents();
    expect(deployedAddress).to.not.be.empty;
  });

  describe('newEvent', function () {
    it('Should create a new event successfully', async function () {
      const myEventsAddress = await deployEvents();
      const myEventsContract = await ethers.getContractAt('Events', myEventsAddress);

      const tx = await myEventsContract.newEvent(
        'ETHDam',
        'A privacy focused hackathon',
        2024,
        2025,
        'myPassword',
        [
          '0x0D4403588DB896B37f6dAac2803eD0e9f8DDC945',
          '0x10D488025abAa5a2d3F30492FE3cbB5591E651dc',
        ],
        ['deca', 'deca2'],
      );

      const receipt = await tx.wait();
      expect(receipt.events).to.exist;
      const event = receipt.events.find(e => e.event === 'EventCreated');
      expect(event).to.exist;
      expect(event.args.name).to.equal('ETHDam');
      expect(event.args.description).to.equal('A privacy focused hackathon');
      expect(event.args.startDate).to.equal(2024);
      expect(event.args.endDate).to.equal(2025);
    });
    it('Should increment eventCount after creating a new event', async function () {
      const myEventsAddress = await deployEvents();
      const myEventsContract = await ethers.getContractAt('Events', myEventsAddress);

      const initialEventCount = await myEventsContract.eventCount();

      await myEventsContract.newEvent(
        'ETHDam',
        'A privacy focused hackathon',
        2024,
        2025,
        'myPassword',
        [
          '0x0D4403588DB896B37f6dAac2803eD0e9f8DDC945',
          '0x10D488025abAa5a2d3F30492FE3cbB5591E651dc',
        ],
        ['deca', 'deca2'],
      );

      const finalEventCount = await myEventsContract.eventCount();
      expect(finalEventCount).to.equal(initialEventCount + BigInt(1));
    });
  });

  describe('genGaslessEndorseTx', function () {
    it('Should generate a gasless transaction successfully', async function () {
      const myEventsAddress = await deployEvents();
      const myEventsContract = await ethers.getContractAt('Events', myEventsAddress);
      // Setup the necessary variables
      const endorsement = "Great event!";
      const endorseeAddress = "0xYourEndorseeAddress";
      const nonce = 0;
      const eventId = 1;

      // Call the function
      const gaslessTx = await myEventsContract.genGaslessEndorseTx(endorsement, endorseeAddress, nonce, eventId);

      // Add your assertions here
      // For example, you might want to check that gaslessTx is not null
      expect(gaslessTx).to.not.be.null;
    });
  });

  describe('endorse', function () {
    it('Should endorse an event successfully', async function () {
      // Deploy the contract
      const myEventsAddress = await deployEvents();
      const myEventsContract = await ethers.getContractAt('Events', myEventsAddress);

      // Create a new event
      const txCreate = await myEventsContract.newEvent(
        'ETHDam',
        'A privacy focused hackathon',
        2024,
        2025,
        'myPassword',
        [
          '0x0D4403588DB896B37f6dAac2803eD0e9f8DDC945',
          '0x10D488025abAa5a2d3F30492FE3cbB5591E651dc',
        ],
        ['deca', 'deca2'],
      );
      await txCreate.wait();

      // Assume the eventId is 1
      const eventId = 1;

      // Assume the endorseeAddressEncrypted is '0xYourEndorseeAddressEncrypted'
      const endorseeAddressEncrypted = '0xYourEndorseeAddressEncrypted';

      // Call the endorse function
      const txEndorse = await myEventsContract.endorse(
        'Great event!',
        endorseeAddressEncrypted,
        eventId
      );

      // Wait for the transaction to be mined
      const receipt = await txEndorse.wait();

      // Check if the EndorsementAdded event was emitted
      const event = receipt.events.find(e => e.event === 'EndorsementAdded');
      expect(event).to.exist;

      // Add more assertions here
      // For example, you might want to check the event arguments
    });
  });

    describe('withdraw', function () {
    it('Should withdraw all balance from gasslessAddress successfully', async function () {
      // Deploy the contract
      const myEventsAddress = await deployEvents();
      const myEventsContract = await ethers.getContractAt('Events', myEventsAddress);

      // Make sure there's some balance in the gasslessAddress
      // ...

      // Call the withdraw function
      const tx = await myEventsContract.withdraw();

      // Wait for the transaction to be mined
      await tx.wait();

      // Check if the balance of the gasslessAddress is 0
      const balance = await ethers.provider.getBalance(myEventsContract.gasslessAddress);
      expect(balance).to.equal(0);
    });
  });
});
