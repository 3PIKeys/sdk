# SDK

The NPM package to interact with 3PI contracts.

![CodeQL](https://github.com/3PIKeys/sdk/actions/workflows/codeql-analysis.yml/badge.svg)
![Version](https://img.shields.io/github/package-json/v/3PIKeys/sdk)
![Downloads](https://img.shields.io/npm/dw/3pi)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## Usage

Install the package using the following:

```
npm i 3pi
```

Importing the package can be done through the following:

```ts
import { KeyManager } from '3pi';
```

The `KeyManager` class includes all the functionality of 3PI, including functions like `isKeyActive()`, `getExpiry()`, `extendKey()`, etc.

It also exposes attributes like `contractAddress`, `providers` and `contractToken` for ease of use.

In order to initialize `KeyManager`, you will need to provide it with the contract address of your 3PI Key Manager contract on-chain, as well as at least 1 RPC URL to use when querying data. The more RPCs you add, the more robust the queries will be, since extra RPCs are used when any call fails.

You can initialize `KeyManager` as follows:

```ts
const keyManager = new KeyManager('<YOUR_CONTRACT_ADDRESS_HERE>', ['<YOUR_RPC_URL_HERE>']);
```

## Functions Available

### Read Only
- `isTierActive(tierID)`
- `getTierPrice(tierID)`
- `getNumTiers()`
- `getNumKeys()`
- `isKeyActive(hash)`
- `keyExists(hash)`
- `getKeyHash(id)`
- `getUserKeys(address)`
- `getRemainingBalance(hash)`
- `getUsedBalance(hash)`
- `getKeyInfo(hash)`
- `findUnrealizedAccounts()`
- `getRealizedProfit()`
- `getUnrealizedProfit()`

### Key Management
- `approve(amountInWei, signer)`
- `activateKey(hash, duration, tierID, signer)`
- `extendKey(hash, duration, signer)`
- `deactivateKey(hash, signer)`

### Admin Controls
- `addTier(price, signer)`
- `archiveTier(tierId, signer)`
- `realizeProfit(hash, signer)`
- `withdraw(signer)`

### Other
- `getPublicHash(apiKey)`
- `generateNewKey()`
- `getWalletBalance(wallet)`
- `getWalletAllowance(wallet)`

## Types

The SDK is written entirely in TypeScript, and any types used within the SDK are located in the `src/types.ts` file.

If needed, these can be imported from `3pi/dist/types` as follows:

```ts
import type { Address, ABIEntry } from '3pi/dist/types';
```
