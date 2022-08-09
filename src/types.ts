
// Address Type:
export type Address = `0x${string}`;

// ABI Types:
export type ABI = (ABIEntry | ExtendedABIEntry | ExtendedABIEventEntry | ExtendedABIConstructorEntry)[];
export type ABIIOType = `int${number}` | `int${number}[${number | ''}]` | `uint${number}` | `uint${number}[${number | ''}]` | `bytes${number | ''}` | `bytes${number | ''}[${number | ''}]` | 'address' | `address[${number | ''}]` | 'bool' | `bool[${number | ''}]` | 'tuple' | `tuple[${number | ''}]` | 'string' | `string[${number | ''}]` | `contract ${string}` | `struct ${string}`;

// Generic Types:
export type URL = `https://${string}`;
export type Hash = `0x${string}`;

/* ========================================================================================================================================================================= */

// Token Interface:
export interface Token {
    address: Address
    symbol: string
    decimals: number
}

/* ========================================================================================================================================================================= */

// ABI Interfaces:
export interface ABIEntry {
    constant: true
    inputs: (ABIIO | ABITupleIO)[]
    name: string
    outputs: (ABIIO | ABITupleIO)[]
    type: 'function'
}
export interface ABIIO {
    name: string
    type: ABIIOType
}
export interface ABITupleIO {
    type: 'tuple' | 'tuple[]'
    components: ABIIO[]
}
export interface ExtendedABIEntry {
    inputs: (ExtendedABIIO | ExtendedABITupleIO)[]
    name: string
    outputs: (ExtendedABIIO | ExtendedABITupleIO)[]
    stateMutability: 'view' | 'nonpayable' | 'payable' | 'pure'
    type: 'function'
}
export interface ExtendedABIEventEntry {
    anonymous: boolean
    inputs: (ExtendedABIIO | ExtendedABITupleIO)[]
    name: string
    type: 'event'
}
export interface ExtendedABIConstructorEntry {
    inputs: (ExtendedABIIO | ExtendedABITupleIO)[]
    stateMutability: 'view' | 'nonpayable' | 'payable' | 'pure'
    type: 'constructor'
}
export interface ExtendedABIIO extends ABIIO {
    indexed?: boolean
    internalType: ABIIOType
}
export interface ExtendedABITupleIO {
    type: 'tuple' | 'tuple[]'
    components: ExtendedABIIO[]
}