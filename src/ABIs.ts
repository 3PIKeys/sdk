
// Type Imports:
import type { ABI } from './types';

/* ========================================================================================================================================================================= */

// 3PI Contract ABI:
export const mainABI: ABI = [
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "secDuration", "type": "uint256" }, { "internalType": "uint64", "name": "tierId", "type": "uint64" }], "name": "activateKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "addTier", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint64", "name": "tierId", "type": "uint64" }], "name": "archiveTier", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "deactivateKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "erc20", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }, { "internalType": "uint256", "name": "secDuration", "type": "uint256" }], "name": "extendKey", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "count", "type": "uint256" }, { "internalType": "uint256", "name": "minAmount", "type": "uint256" }, { "internalType": "bool", "name": "expiredOnly", "type": "bool" }], "name": "findUnrealizedAccounts", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "isKeyActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint64", "name": "tierId", "type": "uint64" }], "name": "isTierActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "keyExists", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "keyId", "type": "uint256" }], "name": "keyHashOf", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "controller", "type": "address" }], "name": "keyHashesOf", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "keyInfo", "outputs": [{ "components": [{ "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "expiryTime", "type": "uint256" }, { "internalType": "uint256", "name": "realizationTime", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint64", "name": "tierId", "type": "uint64" }], "internalType": "struct APIKeyManager.KeyDef", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "numKeys", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "numTiers", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "realizeProfit", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "realizedProfit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "remainingBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint64", "name": "tierId", "type": "uint64" }], "name": "tierPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "unrealizedProfit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "usedBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

// 3PI Contract Events ABI:
export const mainEventsABI: ABI = [
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "ActivateKey", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tierId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }], "name": "AddTier", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "tierId", "type": "uint256" }], "name": "ArchiveTier", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }], "name": "DeactivateKey", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "ExtendKey", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "keyHash", "type": "bytes32" }, { "indexed": false, "internalType": "uint256", "name": "duration", "type": "uint256" }], "name": "ReactivateKey", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "balance", "type": "uint256" }], "name": "Withdraw", "type": "event" }
];

/* ========================================================================================================================================================================= */

// ERC-20 ABI:
export const erc20ABI: ABI = [
  { constant: true, inputs: [{ name: "", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], type: "function" },
  { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], type: "function" },
  { constant: true, inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], name: "allowance", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: false, inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], name: "approve", outputs: [], type: "function" }
];