import { TRANSACTION_REQUEST, TRANSACTION_RESULT, TRANSACTION_ERROR } from 'pages/Mint/Mint.actions'

export interface ContractState {
  mintConfirmation?: number
  error?: any
}

const contractDefaultState: ContractState = {
  mintConfirmation: undefined,
  error: undefined,
}

export function contract(state = contractDefaultState, action: any): ContractState {
  switch (action.type) {
    case TRANSACTION_REQUEST:
      return {
        ...state,
        mintConfirmation: undefined,
        error: undefined,
      }
    case TRANSACTION_RESULT:
      return {
        ...state,
        mintConfirmation: action.mintConfirmation,
        error: undefined,
      }
    case TRANSACTION_ERROR:
      return {
        ...state,
        mintConfirmation: undefined,
        error: action.error,
      }
    default:
      return state
  }
}
