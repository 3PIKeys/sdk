
// Imports:
import { ethers } from 'ethers';
import { mainABI, erc20ABI } from './ABIs';

// Type Imports:
import type { Address, URL, ABI } from './types';

// Initializations:
const maxQueryRetries = 3;
let contractAddress: Address;
let contractToken: { address: Address, symbol: string, decimals: number };
let providers: ethers.providers.StaticJsonRpcProvider[] = [];

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

/* ========================================================================================================================================================================= */

/**
 * Function to make blockchain queries.
 * @param address - The contract's address to query.
 * @param abi - The contract's ABI.
 * @param method - The method to be called from the contract.
 * @param args - Any arguments to pass to the method called.
 * @returns Query results.
 */
export const query = async (address: Address, abi: ABI, method: string, args: any[]) => {
  if(providers.length > 0) {
    let result = undefined;
    let errors = 0;
    let rpcID = 0;
    while(result === undefined && errors < maxQueryRetries) {
      try {
        let contract = new ethers.Contract(address, abi, providers[rpcID]);
        result = await contract[method](...args);
      } catch {
        if(++rpcID >= providers.length) {
          if(++errors >= maxQueryRetries) {
            throw new Error('3PI Query Error: Could not query data on-chain.');
          } else {
            rpcID = 0;
          }
        }
      }
    }
    return result;
  } else {
    throw new Error('3PI Query Error: No providers initialized.');
  }
}

/* ========================================================================================================================================================================= */

/**
 * Function to fetch a wallet's individual token balance.
 * @param wallet - The wallet to query the token balance for.
 * @param token - The token address to find a balance for (Contract's ERC20 by default).
 * @returns The specified wallet's token balance.
 */
export const getTokenBalance = async (wallet: Address, token?: Address) => {

  // Default Contract Token:
  if(token === undefined) {
    if(contractToken) {
      const tokenBalance = parseInt(await query(contractToken.address, erc20ABI, 'balanceOf', [wallet]));
      return tokenBalance / (10 ** contractToken.decimals);
    } else {
      throw new Error('Token Balance Error: 3PI not initialized.');
    }

  // Other Token:
  } else {
    const tokenBalance = parseInt(await query(token, erc20ABI, 'balanceOf', [wallet]));
    if(tokenBalance > 0) {
      const decimals = parseInt(await query(token, erc20ABI, 'decimals', []));
      return tokenBalance / (10 ** decimals);
    } else {
      return 0;
    }
  }
}

/* ========================================================================================================================================================================= */

/**
 * Function to fetch the ERC20 token used by the 3PI contract:
 * @returns The address, symbol and decimals of the ERC20 token used by the 3PI contract.
 */
export const getToken = async () => {
  if(contractAddress) {
    const address: Address = await query(contractAddress, mainABI, 'erc20', []);
    const symbol: string = await query(address, erc20ABI, 'symbol', []);
    const decimals = parseInt(await query(address, erc20ABI, 'decimals', []));
    return { address, symbol, decimals };
  } else {
    throw new Error('Token Error: 3PI not initialized.');
  }
}