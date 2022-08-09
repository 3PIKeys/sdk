
// Type Imports:
import type { ABI } from './types';

/* ========================================================================================================================================================================= */

// 3PI Contract ABI:
export const mainABI: ABI = [
  { constant: true, inputs: [{ name: "_tierId", type: "uint64" }], name: "isTierActive", outputs: [{ name: "", type: "bool" }], type: "function" },
  { constant: true, inputs: [{ name: "_tierId", type: "uint64" }], name: "tierPrice", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [], name: "getNumTiers", outputs: [{ name: "", type: "uint64" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "isKeyActive", outputs: [{ name: "", type: "bool" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "remainingBalance", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "expiryOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "ownerOf", outputs: [{ name: "", type: "address" }], type: "function" },
  { constant: true, inputs: [{ name: "owner", type: "address" }], name: "numKeysOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [{ name: "owner", type: "address" }], name: "numKeysOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "tierIdOf", outputs: [{ name: "", type: "uint64" }], type: "function" },
  { constant: true, inputs: [{ name: "owner", type: "address" }], name: "keysOf", outputs: [{ name: "", type: "bytes32[]" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }, { name: "_msDuration", type: "uint256" }, { name: "_tierId", type: "uint64" }], name: "activateKey", outputs: [], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }, { name: "_msDuration", type: "uint256" }], name: "extendKey", outputs: [], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "deactivateKey", outputs: [], type: "function" }
];

/* ========================================================================================================================================================================= */

// ERC-20 ABI:
export const erc20ABI: ABI = [
  { constant: true, inputs: [{ name: "", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], type: "function" },
  { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], type: "function" }
];