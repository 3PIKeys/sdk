
// Imports:
import { ethers } from 'ethers';
import { query } from './utils';
import { mainABI } from './ABIs';
import { contractAddress, contractToken } from './init';

// Type Imports:
// import type { Address, URL, ABI } from './types';

/* ========================================================================================================================================================================= */

/**
 * Function to convert a private key to a public key:
 * @param privateKey - The private key used for API queries.
 * @returns The corresponding public key.
 */
export const getPublicKey = (privateKey: string) => {
  const key = ethers.utils.keccak256(privateKey);
  return key;
}

/* ========================================================================================================================================================================= */

/**
 * Function to get expiry timestamp of a given key.
 * @param privateKey - The private key used for API queries.
 * @returns The epoch time in milliseconds that the key will expire on.
 */
export const getExpiry = async (privateKey: string) => {
  if(contractAddress) {
    const publicKey = getPublicKey(privateKey);
    const expiryTimestamp = parseInt(await query(contractAddress, mainABI, 'expiryOf', [publicKey]));
    return expiryTimestamp;
  } else {
    throw new Error('3PI Error: Not initialized.');
  }
}

/* ========================================================================================================================================================================= */

/**
 * Function to get tier ID of a given key.
 * @param privateKey - The private key used for API queries.
 * @returns The key's tier ID as an integer.
 */
export const getTierID = async (privateKey: string) => {
  if(contractAddress) {
    const publicKey = getPublicKey(privateKey);
    const tierID = parseInt(await query(contractAddress, mainABI, 'tierIdOf', [publicKey]));
    return tierID;
  } else {
    throw new Error('3PI Error: Not initialized.');
  }
}

/* ========================================================================================================================================================================= */

/**
 * Function to get the price of a given tier.
 * @param tierID - The tier ID of the tier to query for.
 * @returns The tier's price per millisecond.
 */
export const getTierPrice = async (tierID: number) => {
  if(contractAddress) {
    const tierPrice = parseInt(await query(contractAddress, mainABI, 'tierPrice', [tierID]));
    return tierPrice;
  } else {
    throw new Error('3PI Error: Not initialized.');
  }
}

/* ========================================================================================================================================================================= */

/**
 * Function to get a user's remaining balance on a given key:
 * @param privateKey - The private key used for API queries.
 * @returns The user's remaining balance.
 */
export const getRemainingBalance = async (privateKey: string) => {
  if(contractAddress && contractToken) {
    const publicKey = getPublicKey(privateKey);
    const remainingBalance = parseInt(await query(contractAddress, mainABI, 'remainingBalance', [publicKey]));
    return remainingBalance / (10 ** contractToken.decimals);
  } else {
    throw new Error('3PI Error: Not initialized.');
  }
}