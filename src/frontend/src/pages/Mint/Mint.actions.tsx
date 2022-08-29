import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { ERROR, SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { State } from 'reducers'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'

//@ts-ignore
const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev')
//@ts-ignore
Tezos.addExtension(new Tzip12Module())

export const TRANSACTION_REQUEST = 'TRANSACTION_REQUEST'
export const TRANSACTION_RESULT = 'TRANSACTION_RESULT'
export const TRANSACTION_ERROR = 'TRANSACTION_ERROR'
export const transaction = (method: string, amount: number) => async (dispatch: any, getState: any) => {
  const state: State = getState()
  const dexAddress = 'KT1G5B1SuECufhToikBJztgJdgQup2xQrzxE'

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
      type: TRANSACTION_REQUEST,
    })

    const contract = await state.wallet.tezos?.wallet.at(dexAddress)
    let transactionTx

    if (method === 'buySynthUsd') transactionTx = await contract.methods.buySynthUsd().send()
    if (method === 'sellSynthUsd') transactionTx = await contract.methods.sellSynthUsd(amount).send()
    if (method === 'buySynthEth') transactionTx = await contract.methods.buySynthEth().send()
    if (method === 'sellSynthEth') transactionTx = await contract.methods.sellSynthEth(amount).send()
    if (method === 'buySynthBtc') transactionTx = await contract.methods.buySynthBtc().send()
    if (method === 'sellSynthBtc') transactionTx = await contract.methods.sellSynthBtc(amount).send()

    dispatch(showToaster(SUCCESS, 'Executing order...', 'Please wait 30s'))
    const transactionDone = transactionTx && (await transactionTx.confirmation())
    console.log('done', transactionDone)

    dispatch(showToaster(SUCCESS, 'Tokens sent to your wallet', 'Enjoy!'))

    dispatch({
      type: TRANSACTION_RESULT,
      transactionConfirmation: transactionDone,
    })
  } catch (error: any) {
    console.error(error)
    dispatch(showToaster(ERROR, 'Error', error.message))
    dispatch({
      type: TRANSACTION_ERROR,
      error,
    })
  }
}
