import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { State } from 'reducers'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'

//@ts-ignore
const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev')
//@ts-ignore
Tezos.addExtension(new Tzip12Module())

export const MINT_REQUEST = 'MINT_REQUEST'
export const MINT_RESULT = 'MINT_RESULT'
export const MINT_ERROR = 'MINT_ERROR'
export const mint = (amount: number) => async (dispatch: any, getState: any) => {
  const state: State = getState()
  const dexAddress = 'KT1SqhRncvYBpoz9nurDqtCEM6qd8Rgq6NMn'

  if (!state.wallet.tezos) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Please return to homepage'))
    return
  }

  if (!state.wallet.accountPkh) {
    dispatch(showToaster(ERROR, 'Please connect your wallet', 'Please return to homepage'))
    return
  }

  if (state.loading) {
    dispatch(showToaster(ERROR, 'Cannot send transaction', 'Previous transaction still pending...'))
    return
  }

  if (!amount) {
    dispatch(showToaster(ERROR, 'Incorrect amount', 'Please enter a correct ammount'))
    return
  }

  try {
    dispatch({
      type: MINT_REQUEST,
    })

    const contract = await state.wallet.tezos?.wallet.at(dexAddress)
    const mintTransaction = await contract.methods.buySynthUsd(amount).send()
    dispatch(showToaster(SUCCESS, 'Buying sUSD...', 'Please wait 30s'))

    const mintDone = await mintTransaction.confirmation()
    console.log('done', mintDone)

    dispatch(showToaster(SUCCESS, 'sUSD sent to your wallet', 'Enjoy!'))

    dispatch({
      type: MINT_RESULT,
      mintConfirmation: mintDone,
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: MINT_ERROR,
      error,
    })
  }
}
