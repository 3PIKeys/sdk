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
import weaver from 'weaverfi'
```

Other options to suit different app configurations:

```ts
import WeaverFi from 'weaverfi'
import { WeaverFi } from 'weaverfi'
const weaver = require('weaverfi').default
```

The `WeaverFi` object (or `weaver` if you prefer to import it that way) contains some global methods such as `WeaverFi.getAllProjects()`, `WeaverFi.getAllTokens()` or `WeaverFi.getAllTokenPrices()`.

Each supported chain has its own methods that can be used as `WeaverFi.ETH.getWalletBalance(wallet)`, for example.

## Global Methods Available

- `getAllChains()`
- `getAllChainInfo()`
- `getAllProjects()`
- `getAllTokens()`
- `getAllTokenPrices()`
- `getNativeTokenPrices()`
- `fetchPrices()`
- `getAllBalances(wallet)`

## Chain Methods Available

- `query(address, abi, method, args)`
- `queryBlocks(address, abi, event, querySize, args, start, end)`
- `isAddress(address)`
- `getTXCount(address)`
- `getWalletBalance(wallet)`
- `getProjectBalance(wallet, project)`
- `getAllProjectBalances(wallet)`
- `getNFTBalance(wallet)`
- `getTokens()`
- `getTokenLogo(symbol)`
- `getGasEstimates()`
- `getInfo()`
- `getProjects()`
- `getTokenPrices()`
- `getTokenPrice(address, decimals)`
- `updateTokenPrice(priceData)`
- `fetchPrices()`

The ETH chain also contains the `resolveENS(name)`, `lookupENS(address)` and `fetchAvatarENS(name)` methods.

## Chains Supported

- ETH (Ethereum)
- BSC (Binance Smart Chain)
- POLY (Polygon)
- FTM (Fantom)
- AVAX (Avalanche)
- ONE (Harmony)
- CRONOS (Cronos)
- OP (Optimism)
- ARB (Arbitrum)

## Types

Any extra types used within the SDK are located in the `types.ts` file.

If needed, these can be imported from `weaverfi/dist/types`. Example:

```ts
import type { ChainID, Address, Token } from 'weaverfi/dist/types';
```
