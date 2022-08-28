import { connect } from 'app/App.components/Menu/Menu.actions'
import { useDispatch, useSelector } from 'react-redux'

import { State } from 'reducers'
import { mint } from './Mint.actions'
import { MintView } from './Mint.view'

export const Mint = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { wallet, ready, tezos, accountPkh } = useSelector((state: State) => state.wallet)

  const mintCallback = () => {
    dispatch(mint(1))
  }

  const handleConnect = () => {
    dispatch(connect({ forcePermission: false }))
  }

  return <MintView mintCallback={mintCallback} connectCallback={handleConnect} loading={loading} accountPkh={accountPkh} />
}
