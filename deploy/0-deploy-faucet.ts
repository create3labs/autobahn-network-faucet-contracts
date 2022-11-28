import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const sleep = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();
  const args = [hre.ethers.utils.parseEther('1')];
  const deployResult = await deploy('Faucet', {
    from: deployer,
    args,
    log: true,
  });

  console.info(`Waiting 10 seconds before verifying...`);
  await sleep(10000);

  if (hre.network.name !== 'hardhat') {
    await hre.run('verify:verify', {
      address: deployResult.address,
      constructorArguments: args,
    });
  }
};
export default func;
