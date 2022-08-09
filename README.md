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
npm i 3PI
```

Importing the package can be done through the following:

```ts
import { init, keys, utils } from '3PI';
```

The `init` function is what can be used to initialize 3PI on your API or web application. You'll need to pass it the address of your 3PI key management contract on-chain, as well as at least 1 RPC you would like to use for querying data. If more RPCs are added, functionality will be more robust as if one fails, the SDK will utilize another one to attempt to successfully fetch data.

The `keys` object contains all the main key management functions that interact with the 3PI contract, such as `getRemainingBalance()`, `getExpiry()`, etc.

The `utils` object contains any useful functions that can be used to facilitate an integration, such as a generic `query()` function to query data on-chain, a `getTokenBalance()` function to query a user's token balance, etc.

## Key Management Functions Available

- `getPublicKey(privateKey)`
- `getExpiry(privateKey)`
- `getTierID(privateKey)`
- `getTierPrice(tierID)`
- `getRemainingBalance(privateKey)`

## Utility Functions Available

- `query(address, abi, method, args)`
- `getTokenBalance(wallet)`
- `getToken()`

## Types

Any types used within the SDK are located in the `src/types.ts` file.

If needed, these can be imported from `3PI/dist/types` as follows:

```ts
import type { Address, ABIEntry } from '3PI/dist/types';
```
