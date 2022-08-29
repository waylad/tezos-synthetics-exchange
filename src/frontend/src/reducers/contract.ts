import {
  TRANSACTION_REQUEST,
  TRANSACTION_RESULT,
  TRANSACTION_ERROR,
  GET_PRICES_REQUEST,
  GET_PRICES_RESULT,
  GET_PRICES_ERROR,
} from 'pages/Mint/Mint.actions'

export interface ContractState {
  mintConfirmation?: number
  prices: {
    XTZUSD: number
    BTCUSD: number
    ETHUSD: number
  }
  error?: any
}

const contractDefaultState: ContractState = {
  mintConfirmation: undefined,
  prices: {
    XTZUSD: 0,
    BTCUSD: 0,
    ETHUSD: 0,
  },
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
    case GET_PRICES_REQUEST:
      return {
        ...state,
        prices: {
          XTZUSD: 0,
          BTCUSD: 0,
          ETHUSD: 0,
        },
        error: undefined,
      }
    case GET_PRICES_RESULT:
      return {
        ...state,
        prices: action.prices,
        error: undefined,
      }
    case GET_PRICES_ERROR:
      return {
        ...state,
        prices: {
          XTZUSD: 0,
          BTCUSD: 0,
          ETHUSD: 0,
        },
        error: action.error,
      }
    default:
      return state
  }
}
