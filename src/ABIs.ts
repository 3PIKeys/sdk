
// Type Imports:
import type { ABI } from './types';

/* ========================================================================================================================================================================= */

// 3PI Contract ABI:
export const mainABI: ABI = [
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_msDuration", "type": "uint256" }, { "internalType": "uint64", "name": "_tierId", "type": "uint64" }], "name": "activateKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }], "name": "deactivateKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "erc20", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }], "name": "expiryOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "_msDuration", "type": "uint256" }], "name": "extendKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }], "name": "isKeyActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint64", "name": "_tierId", "type": "uint64" }], "name": "isTierActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "keysOf", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "numKeys", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "numKeysOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "numTiers", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }], "name": "remainingBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }], "name": "tierIdOf", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint64", "name": "_tierId", "type": "uint64" }], "name": "tierPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "_keyHash", "type": "bytes32" }, { "internalType": "address", "name": "_to", "type": "address" }], "name": "transfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

/* ========================================================================================================================================================================= */

// ERC-20 ABI:
export const erc20ABI: ABI = [
  { constant: true, inputs: [{ name: "", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], type: "function" },
  { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], type: "function" }
];