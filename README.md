# tezos-synthetics-exchange

![](https://i.ibb.co/fkXvnnX/Screenshot-2022-08-29-at-17-46-21.png)

## Live Demo (Ghostnet): https://tezos-synthetics-exchange.pages.dev/

## Demo Video: Uploading now....

## About Tezos-synthetics-exchange

Tezos-synthetics-exchange is a decentralized, self-governing, non-custodial platform for issuing synthetic assets on the Tezos blockchain.

Synthetic assets are financial derivatives that don’t give us the right to deliver or own the underlying asset but allow us to take advantage of its price.

What are the differences between synthetic and wrapped assets?

Wrapped assets are backed by those underlying them, which are stored on other blockchains. For example, to issue tzETH on Tezos, you need to lock ETH on the Ethereum blockchain. In turn, synthetic assets can be collateralized by any coin as long as the cost of the collateral is higher than the cost of the issued tokens by an acceptable proportion. A detailed overview of synthetic assets is available on our blog.

Tezos-synthetics-exchange can issue synthetic dollars (sUSD) and cryptocurrencies from other blockchains (sETH and sBTC).

### Minting Synthetics (Borrowing)

For example, a user can lock collateral in TEZ to mint sUSD synthetic assets. It works like a loan — a user locks TEZ and, in return, receives a sUSD amount equivalent up to the locked collateral.

To create synthetic collateral with Tezos-synthetics-exchange, connect your Tezos wallet to the protocol, choose which Synthetics to mint (sUSD, sBTC or sETH) and th amount of TEZ you want to put as collateral.

Tezos-synthetics-exchange uses the [Harbinger Ghostnet Normalizer Contract](https://better-call.dev/ghostnet/KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX/storage) to determine automatically how much of the chosen Synthetic you will receive in exchange of your XTZ (using the corresponding exchange rates for XTZ-USD, BTC-USD and ETX-USD)

### Synthetic assets available for minting

- sUSD — an algorithmic Stable Token pegged to the value of USD and collateralized in TEZ.
- sBTC — an algorithmic Stable Token pegged to the value of BTC and collateralized in TEZ.
- sETH — an algorithmic Stable Token pegged to the value of ETH and collateralized in TEZ.

### Smart contracts

The smart contracts are written in SmartPy and can be compiled and deployed on smartpy.io. They are located in `src/contracts`

### Frontend

The fronted is located in `src/frontend` and cn be run using:

```
yarn install
yarn start
```

## Questions?

If you need anything, please let me know at waylad42@gmail.com
