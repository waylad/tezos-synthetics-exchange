# tezos-synthetics-exchange

![](https://i.ibb.co/4NDZkbq/Screenshot-2022-08-29-at-22-26-46.png)

## Live Demo (Ghostnet): https://tezos-synthetics-exchange.pages.dev/

## Demo Video: https://youtu.be/oGK_cAy6z7Q

## About Tezos-synthetics-exchange

Tezos-synthetics-exchange is a decentralized, self-governing, non-custodial platform for issuing synthetic assets on the Tezos blockchain.

Synthetic assets are financial derivatives that don’t give us the right to deliver or own the underlying asset but allow us to take advantage of its price.

### What are the differences between synthetic and wrapped assets?

Wrapped assets are backed by those underlying them, which are stored on other blockchains. For example, to issue tzETH on Tezos, you need to lock ETH on the Ethereum blockchain. In turn, synthetic assets can be collateralized by any coin as long as the cost of the collateral is higher than the cost of the issued tokens by an acceptable proportion.

Tezos-synthetics-exchange can issue synthetic dollars (sUSD) and cryptocurrencies from other blockchains (sETH and sBTC).

### Minting Synthetics (Borrowing)

For example, a user can lock collateral in TEZ to mint sUSD synthetic assets. It works like a loan — a user locks TEZ and, in return, receives a sUSD amount equivalent up to the locked collateral.

To create synthetic collateral with Tezos-synthetics-exchange, connect your Tezos wallet to the protocol, choose which Synthetics to mint (sUSD, sBTC or sETH) and th amount of TEZ you want to put as collateral.

Tezos-synthetics-exchange uses the [Harbinger Ghostnet Normalizer Contract](https://better-call.dev/ghostnet/KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX/storage) to determine automatically how much of the chosen Synthetic you will receive in exchange of your XTZ (using the corresponding exchange rates for XTZ-USD, BTC-USD and ETX-USD)

### Synthetic assets available for minting

- sUSD — a synthetic asset pegged to the value of USD, available at [KT1BbKvF35VRn9WaQNdAjC98ENSEcX1HSdwz](https://better-call.dev/ghostnet/KT1BbKvF35VRn9WaQNdAjC98ENSEcX1HSdwz)
- sBTC — a synthetic asset pegged to the value of BTC, available at [KT1Sxot6LZJsm2fTG3N82SPXfQxbuNr1NRr6](https://better-call.dev/ghostnet/KT1Sxot6LZJsm2fTG3N82SPXfQxbuNr1NRr6)
- sETH — a synthetic asset pegged to the value of ETH, available at [KT1GH8gbE7XVp2bmM4k97KmiTQidddT1MgsQ](https://better-call.dev/ghostnet/KT1GH8gbE7XVp2bmM4k97KmiTQidddT1MgsQ)

The exchange is deployed to [KT1G5B1SuECufhToikBJztgJdgQup2xQrzxE](https://better-call.dev/ghostnet/KT1G5B1SuECufhToikBJztgJdgQup2xQrzxE)

### Backlog for reaching 'completion'

- [Smart Contract] Complete harbinger integration
- [Smart Contract] Add more Synths
- [Smart Contract] Implement asset overcollateralization and CDP liquidation
- [Frontend] Add history graphs
- [Frontend] Implement UI for asset overcollateralization and CDP liquidation

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
