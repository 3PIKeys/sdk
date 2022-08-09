
// Type Imports:
import type { ABI } from './types';

/* ========================================================================================================================================================================= */

// 3PI Contract ABI:
export const mainABI: ABI = [
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "expiryOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "tierOf", outputs: [{ name: "", type: "uint64" }], type: "function" },
  { constant: true, inputs: [{ name: "", type: "uint64" }], name: "tierPrice", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [{ name: "_keyHash", type: "bytes32" }], name: "remainingBalance", outputs: [{ name: "", type: "uint256" }], type: "function" }
];

/* ========================================================================================================================================================================= */

// ERC-20 ABI:
export const erc20ABI: ABI = [
  { constant: true, inputs: [{ name: "", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], type: "function" },
  { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], type: "function" },
  { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], type: "function" }
];