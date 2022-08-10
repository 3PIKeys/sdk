
// Imports:
import { KeyManager } from './index';

// Type Imports:
import { Address, URL } from './types';

// Settings:
const contractAddress: Address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const rpcs: URL[] = ['http://127.0.0.1:8545/'];

/* ========================================================================================================================================================================= */

// Instantiating Key Manager:
const keyManager = new KeyManager(contractAddress, rpcs);

/* ========================================================================================================================================================================= */

// Test Function:
const test = async () => {
  // const testResults = await keyManager.getNumTiers();
  // console.log('Test Results:', testResults);
}

/* ========================================================================================================================================================================= */

test();