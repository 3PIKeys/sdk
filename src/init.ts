
// Imports:
import { ethers } from 'ethers';
import { getToken } from './utils';

// Type Imports:
import type { Address, URL } from './types';

// Initializations:
export let contractAddress: Address;
export let contractToken: { address: Address, symbol: string, decimals: number };
export let providers: ethers.providers.StaticJsonRpcProvider[] = [];

/* ========================================================================================================================================================================= */

/**
 * Function to initialize 3PI.
 * @param contract - The contract address on-chain for your deployed 3PI contract.
 * @param rpcs - The RPCs to use to query on-chain data.
 */
export const init = async (contract: Address, rpcs: URL[]) => {
  if(contract) {
    if(rpcs.length > 0) {
      
      // Initializing Contract Address:
      contractAddress = contract;

      // Initializing Contract Token:
      contractToken = await getToken();

      // Initializing Providers:
      providers = rpcs.map(rpc => new ethers.providers.StaticJsonRpcProvider(rpc));

    } else {
      throw new Error('3PI Initialization Error: No RPCs provided.');
    }
  } else {
    throw new Error('3PI Initialization Error: No valid contract address provided.');
  }
}