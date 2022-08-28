import { TempleWallet } from '@temple-wallet/dapp'
import { Mint } from 'pages/Mint/Mint.controller'
import { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { setWallet } from './App.components/Menu/Menu.actions'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import { configureStore } from './App.store'
import { AppView } from './App.style'

export const store = configureStore({})

export const AppContainer = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    return TempleWallet.onAvailabilityChange((available) => {
      if (available) dispatch(setWallet(new TempleWallet('tezos-synthetics-exchange')))
    })
  }, [dispatch])

  return (
    <BrowserRouter>
      <AppView>
        {/* <Menu /> */}
        <Routes>
          <Route path="/" element={<Mint />} />
        </Routes>
      </AppView>
      {/* <Footer /> */}
      <Toaster />
    </BrowserRouter>
  )
}

export const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
