
// Imports:
import { ethers } from 'ethers';
import { mainABI, erc20ABI } from './ABIs';

// Type Imports:
import type { Address, URL, Hash, Token, ABI, KeyInfo } from './types';

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
   * @returns Tier's price per second, in wei.
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
   * Function to get the number of keys present on the 3PI contract.
   * @returns Number of keys.
   */
  getNumKeys = async () => {
    const numKeys = parseInt(await query(this.providers, this.contractAddress, mainABI, 'numKeys', []));
    return numKeys;
  }

  /**
   * Function to check if a key is active (exists and is not expired).
   * @param hash - The public hash of the key to query info for.
   * @returns True or false.
   */
  isKeyActive = async (hash: Hash) => {
    const isActive: boolean = await query(this.providers, this.contractAddress, mainABI, 'isKeyActive', [hash]);
    return isActive;
  }

  /**
   * Function to check if key exists.
   * @param hash - The public hash of the key to query info for.
   * @returns True or false.
   */
  keyExists = async (hash: Hash) => {
    const keyExists: boolean = await query(this.providers, this.contractAddress, mainABI, 'keyExists', [hash]);
    return keyExists;
  }

  /**
   * Function to get a key's public hash from its key ID.
   * @param id - The ID of the key to query info from.
   * @returns The key's public hash.
   */
  getKeyHash = async (id: number) => {
    const hash: Hash = await query(this.providers, this.contractAddress, mainABI, 'keyHashOf', [id]);
    return hash;
  }

  /**
   * Function to get a user's list of API keys.
   * @param address - The user's address to query key info from.
   * @returns The list of public key hashes from the given user.
   */
  getUserKeys = async (address: Address) => {
    const hashes: Hash[] = await query(this.providers, this.contractAddress, mainABI, 'keyHashesOf', [address]);
    return hashes;
  }

  /**
   * Function to get a user's remaining balance on a given key.
   * @param hash - The public hash of the key to query info for.
   * @returns Key's remaining balance, in wei.
   */
  getRemainingBalance = async (hash: Hash) => {
    const remainingBalance = parseInt(await query(this.providers, this.contractAddress, mainABI, 'remainingBalance', [hash]));
    return remainingBalance;
  }

  /**
   * Function to get a key's used balance.
   * @param hash - The public hash of the key to query info for.
   * @returns Key's used balance, in wei.
   */
  getUsedBalance = async (hash: Hash) => {
    const usedBalance = parseInt(await query(this.providers, this.contractAddress, mainABI, 'usedBalance', [hash]));
    return usedBalance;
  }

  /**
   * Function to get a key's info.
   * @param hash - The public hash of the key to query info for.
   * @returns All relevant key info.
   */
  getKeyInfo = async (hash: Hash) => {
    const keyInfo: KeyInfo = await query(this.providers, this.contractAddress, mainABI, 'keyInfo', [hash]);
    return keyInfo;
  }

  /**
   * Function to find accounts with unrealized used balances.
   * @param options - Optional number of results, minimal used balances or filtering by expired keys only.
   * @returns Array of key hashes and their unrealized used balances.
   */
  findUnrealizedAccounts = async (options?: { count?: number, min?: number, expired?: boolean }) => {
    const accounts: { hash: Hash, usedBalance: number }[] = [];
    const contractToken = await this.contractToken;
    const count = options?.count ? options.count : 256;
    const min = options?.min ? options.min : 0;
    const expired = options?.expired ? options.expired : false;
    const results: [Hash[], number[]] = await query(this.providers, this.contractAddress, mainABI, 'findUnrealizedAccounts', [count, min, expired]);
    for(let i = 0; i < results[1].length; i++) {
      if(results[1][i] > 0) {
        accounts.push({ hash: results[0][i], usedBalance: results[1][i] / (10 ** contractToken.decimals) });
      }
    }
    return accounts;
  }

  /**
   * Function to get realized profit ready to be withdrawn.
   * @returns Realized profit.
   */
  getRealizedProfit = async () => {
    const contractToken = await this.contractToken;
    const realizedProfit = parseInt(await query(this.providers, this.contractAddress, mainABI, 'realizedProfit', []));
    return realizedProfit / (10 ** contractToken.decimals);
  }

  /**
   * Function to get unrealized profit (yet to be realized).
   * @returns Unrealized profit.
   */
  getUnrealizedProfit = async () => {
    const contractToken = await this.contractToken;
    const unrealizedProfit = parseInt(await query(this.providers, this.contractAddress, mainABI, 'unrealizedProfit', []));
    return unrealizedProfit / (10 ** contractToken.decimals);
  }

  /**
   * Function to activate API key.
   * @param hash - The public hash of the key to activate on the 3PI contract.
   * @param duration - How long the key should be valid for, in seconds.
   * @param tierID - The tier ID of the API key.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  activateKey = async (hash: Hash, duration: number, tierID: number, signer: ethers.Signer) => {
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'activateKey', [hash, duration, tierID]);
    return txReceipt;
  }

  /**
   * Function to extend the duration of an API key.
   * @param hash - The public hash of the key to extend the duration of.
   * @param duration - For how long the API key should be extended for, in seconds.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  extendKey = async (hash: Hash, duration: number, signer: ethers.Signer) => {
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'extendKey', [hash, duration]);
    return txReceipt;
  }

  /**
   * Function to deactivate and withdraw all funds from an API key.
   * @param hash - The publish hash of the key to deactivate.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  deactivateKey = async (hash: Hash, signer: ethers.Signer) => {
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'deactivateKey', [hash]);
    return txReceipt;
  }

  /**
   * Function to add new priced tier to the 3PI contract.
   * @param price - The price per second on the new tier.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  addTier = async (price: number, signer: ethers.Signer) => {
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'addTier', [price]);
    return txReceipt;
  }

  /**
   * Function to archive a tier on the 3PI contract (rejects new subscriptions).
   * @param tierId - The tier ID to archive.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  archiveTier = async (tierId: number, signer: ethers.Signer) => {
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'archiveTier', [tierId]);
    return txReceipt;
  }

  /**
   * Function to realize profit from one key.
   * @param hash - The public hash of the key to realize profits from.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  realizeProfit = async (hash: Hash, signer: ethers.Signer) => {
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'realizeProfit', [hash]);
    return txReceipt;
  }

  /**
   * Function to withdraw all realized profits from key manager contract.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  withdraw = async (signer: ethers.Signer) => {
    const txReceipt = await write(signer, this.contractAddress, mainABI, 'withdraw', []);
    return txReceipt;
  }

  /**
   * Function to approve token expenditure to key manager contract.
   * @param amountInWei - The amount to be approved for expenditure, in wei.
   * @param signer - The Signer object of the wallet signing the transaction.
   * @returns Transaction receipt after completion.
   */
  approve = async (amountInWei: ethers.BigNumberish, signer: ethers.Signer) => {
    const contractToken = await this.contractToken;
    const txReceipt = await write(signer, contractToken.address, erc20ABI, 'approve', [ethers.BigNumber.from(amountInWei)]);
    return txReceipt;
  }

  /**
   * Function to convert an API key to its public hash.
   * @param apiKey - The API key to get the public hash for.
   * @returns Key's corresponding public hash, as a hex string.
   */
  getPublicHash = (apiKey: string) => {
    const bytes = ethers.utils.base58.decode(apiKey);
    const publicHash = ethers.utils.keccak256(bytes) as Hash;
    return publicHash;
  }

  /**
   * Function to generate new random API key.
   * @returns New API key.
   */
  generateNewKey = () => {
    const randomBytes = ethers.utils.randomBytes(32);
    const apiKey = ethers.utils.base58.encode(randomBytes);
    return apiKey;
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

  /**
   * Function to fetch a wallet's token allowance granted to the key manager contract.
   * @param wallet - The wallet to query the token allowance for.
   * @returns Token allowance from the specified wallet.
   */
  getWalletAllowance = async (wallet: Address) => {
    const contractToken = await this.contractToken;
    const allowance = parseInt(await query(this.providers, contractToken.address, erc20ABI, 'allowance', [wallet, this.contractAddress]));
    return allowance / (10 ** contractToken.decimals);
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
const query = async (providers: ethers.providers.StaticJsonRpcProvider[], address: Address, abi: ABI, method: string, args: any[]) => {
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
const write = async (signer: ethers.Signer, address: Address, abi: ABI, method: string, args: any[]) => {
  let contract = new ethers.Contract(address, abi, signer);
  let tx: ethers.providers.TransactionResponse = await contract[method](...args);
  let receipt = await tx.wait();
  return receipt;
}