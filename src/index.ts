
// Imports:
import { ethers } from 'ethers';
import { mainABI, erc20ABI } from './ABIs';

// Type Imports:
import type { Address, URL, Hash, Token, ABI } from './types';

// Initializations:
const maxQueryRetries = 3;

/* ========================================================================================================================================================================= */

// 3PI Functionality:
export class KeyManager {

  // Initializations:
  contractAddress: Address;
  providers: ethers.providers.StaticJsonRpcProvider[] = [];
  contractToken: Promise<Token>;

  // Class Constructor:
  constructor(contractAddress: Address, rpcs: URL[]) {
    this.contractAddress = contractAddress;
    this.providers = rpcs.map(rpc => new ethers.providers.StaticJsonRpcProvider(rpc));
    this.contractToken = getToken(this.providers, this.contractAddress);
  }

  /**
   * Function to check if a tier is active.
   * @param tierID - The tier ID to check.
   * @returns True or false.
   */
  isTierActive = async (tierID: number) => {
    const isActive: boolean = await query(this.providers, this.contractAddress, mainABI, 'isTierActive', [tierID]);
    return isActive;
  }

  /**
   * Function to get the price of a given tier.
   * @param tierID - The tier ID of the tier to query for.
   * @returns Tier's price per millisecond.
   */
  getTierPrice = async (tierID: number) => {
    const tierPrice = parseInt(await query(this.providers, this.contractAddress, mainABI, 'tierPrice', [tierID]));
    return tierPrice;
  }

  /**
   * Function to get the number of tiers created on the 3PI contract.
   * @returns Number of tiers.
   */
  getNumTiers = async () => {
    const numTiers = parseInt(await query(this.providers, this.contractAddress, mainABI, 'numTiers', []));
    return numTiers;
  }

  /**
   * Function to check if a key is active (exists and is not expired).
   * @param apiKey - The API key to query info for.
   * @returns True or false.
   */
  isKeyActive = async (apiKey: string) => {
    const isActive: boolean = await query(this.providers, this.contractAddress, mainABI, 'isKeyActive', [apiKey]);
    return isActive;
  }

  /**
   * Function to get a user's remaining balance on a given key.
   * @param apiKey - The API key to query info for.
   * @returns User's remaining balance.
   */
  getRemainingBalance = async (apiKey: string) => {
    const publicHash = this.getPublicHash(apiKey);
    const contractToken = await this.contractToken;
    const remainingBalance = parseInt(await query(this.providers, this.contractAddress, mainABI, 'remainingBalance', [publicHash]));
    return remainingBalance / (10 ** contractToken.decimals);
  }

  /**
   * Function to get expiry timestamp of a given key.
   * @param apiKey - The API key to query info for.
   * @returns Epoch time in milliseconds that the key will expire on.
   */
  getExpiry = async (apiKey: string) => {
    const publicHash = this.getPublicHash(apiKey);
    const expiryTimestamp = parseInt(await query(this.providers, this.contractAddress, mainABI, 'expiryOf', [publicHash]));
    return expiryTimestamp;
  }

  /**
   * Function to get API key owner.
   * @param apiKey - The API key to query info for.
   * @returns Owner wallet address.
   */
  getOwner = async (apiKey: string) => {
    const publicHash = this.getPublicHash(apiKey);
    const owner: Address = await query(this.providers, this.contractAddress, mainABI, 'ownerOf', [publicHash]);
    return owner;
  }

  /**
   * Function to get number of keys owned by a specific wallet.
   * @param wallet - The wallet address to query keys from.
   * @returns Number of keys owned.
   */
  getNumOwnedKeys = async (wallet: Address) => {
    const numKeys = parseInt(await query(this.providers, this.contractAddress, mainABI, 'numKeysOf', [wallet]));
    return numKeys;
  }

  /**
   * Function to get tier ID of a given key.
   * @param apiKey - The API key to query info for.
   * @returns Key's tier ID as an integer.
   */
  getTierID = async (apiKey: string) => {
    const publicHash = this.getPublicHash(apiKey);
    const tierID = parseInt(await query(this.providers, this.contractAddress, mainABI, 'tierIdOf', [publicHash]));
    return tierID;
  }

  /**
   * Function to get keys owned by a specific wallet.
   * @param wallet - The wallet address to query keys from.
   * @returns Array of API keys.
   */
  getOwnedKeys = async (wallet: Address) => {
    const byteKeys: ethers.BytesLike[] = await query(this.providers, this.contractAddress, mainABI, 'keysOf', [wallet]);
    const keys = byteKeys.map(bytes => ethers.utils.parseBytes32String(bytes));
    return keys;
  }

  /**
   * Function to activate API key.
   * @param apiKey - The API key to activate on the 3PI contract.
   * @param durationInMs - How long the key should be valid for, in milliseconds.
   * @param tierID - The tier ID of the API key.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  activateKey = async (apiKey: string, durationInMs: number, tierID: number, signer: ethers.Signer) => {
    const publicHash = this.getPublicHash(apiKey);
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'activateKey', [publicHash, durationInMs, tierID]);
    return txReceipt;
  }

  /**
   * Function to extend the duration of an API key.
   * @param apiKey - The API key to extend the duration of.
   * @param durationInMs - For how long the API key should be extended for.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  extendKey = async (apiKey: string, durationInMs: number, signer: ethers.Signer) => {
    const publicHash = this.getPublicHash(apiKey);
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'extendKey', [publicHash, durationInMs]);
    return txReceipt;
  }

  /**
   * Function to deactivate and withdraw all funds from an API key.
   * @param apiKey - The API key to deactivate.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  deactivateKey = async (apiKey: string, signer: ethers.Signer) => {
    const publicHash = this.getPublicHash(apiKey);
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'deactivateKey', [publicHash]);
    return txReceipt;
  }

  /**
   * Function to transfer an API key to another wallet.
   * @param apiKey - The API key to transfer.
   * @param receiver - The wallet receiving the API key.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  transferKey = async (apiKey: string, receiver: Address, signer: ethers.Signer) => {
    const publicHash = this.getPublicHash(apiKey);
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'transfer', [publicHash, receiver]);
    return txReceipt;
  }

  /**
   * Function to convert an API key to its public hash.
   * @param apiKey - The API key to convert.
   * @returns Key's corresponding public hash, as a hex string.
   */
  getPublicHash = (apiKey: string) => {
    const publicHash = ethers.utils.keccak256(apiKey) as Hash;
    return publicHash;
  }

  /**
   * Function to fetch a wallet's individual token balance.
   * @param wallet - The wallet to query the token balance for.
   * @returns Token balance from the specified wallet.
   */
  getWalletBalance = async (wallet: Address) => {
    const contractToken = await this.contractToken;
    const tokenBalance = parseInt(await query(this.providers, contractToken.address, erc20ABI, 'balanceOf', [wallet]));
    return tokenBalance / (10 ** contractToken.decimals);
  }
}

/* ========================================================================================================================================================================= */

// Helper function to fetch the ERC20 token used by the 3PI contract.
const getToken = async (providers: ethers.providers.StaticJsonRpcProvider[], contractAddress: Address) => {
  const address: Address = await query(providers, contractAddress, mainABI, 'erc20', []);
  const symbol: string = await query(providers, address, erc20ABI, 'symbol', []);
  const decimals = parseInt(await query(providers, address, erc20ABI, 'decimals', []));
  return { address, symbol, decimals };
}

/* ========================================================================================================================================================================= */

// Helper function to make blockchain queries:
export const query = async (providers: ethers.providers.StaticJsonRpcProvider[], address: Address, abi: ABI, method: string, args: any[]) => {
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
            throw new Error('3PI Error: Could not query data on-chain.');
          } else {
            rpcID = 0;
          }
        }
      }
    }
    return result;
  } else {
    throw new Error('3PI Error: No providers set.');
  }
}

/* ========================================================================================================================================================================= */

// Helper function to make blockchain transactions:
export const write = async (signer: ethers.Signer, address: Address, abi: ABI, method: string, args: any[]) => {
  let contract = new ethers.Contract(address, abi, signer);
  let tx = await contract[method](...args);
  let receipt = await tx.wait();
  return receipt;
}