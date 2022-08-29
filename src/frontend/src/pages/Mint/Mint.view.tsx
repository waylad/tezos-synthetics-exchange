// prettier-ignore
import { Button } from 'app/App.components/Button/Button.view'
import { Input } from 'app/App.components/Input/Input.view'
import { useState } from 'react'
import { MintLine, MintLineGrid, MintLines, MintPrice, MintStyled } from './Mint.style'

type MintViewProps = {
  transactionCallback: (method: string, amount: number) => void
  connectCallback: () => void
  loading: boolean
  accountPkh?: string
  prices?: any
}

export const MintView = ({ transactionCallback, connectCallback, loading, accountPkh, prices }: MintViewProps) => {
  const [amounts, setAmounts] = useState({
    buySynthUsd: '',
    sellSynthUsd: '',
    buySynthEth: '',
    sellSynthEth: '',
    buySynthBtc: '',
    sellSynthBtc: '',
  })

  return (
    <MintStyled>
      {accountPkh ? (
        <MintLines>
          <MintLine>
            <h1>Synthetic USD</h1>
            <MintLineGrid>
              <div>
                <Input
                  value={amounts.buySynthUsd}
                  placeholder={'Amount (XTZ)'}
                  onChange={(e: any) => {
                    setAmounts({
                      ...amounts,
                      buySynthUsd: e.target.value,
                    })
                  }}
                  onBlur={() => {}}
                  type={'text'}
                />
                <Button clickCallback={() => transactionCallback('buySynthUsd', parseInt(amounts.buySynthUsd || '0'))} appearance="up">
                  Buy sUSD
                </Button>
              </div>
              <MintPrice>1 sUSD = {prices.XTZUSD} XTZ</MintPrice>
              <div>
                <Input
                  value={amounts.sellSynthUsd}
                  placeholder={'Amount (sUSD)'}
                  onChange={(e: any) => {
                    setAmounts({
                      ...amounts,
                      sellSynthUsd: e.target.value,
                    })
                  }}
                  onBlur={() => {}}
                  type={'text'}
                />
                <Button clickCallback={() => transactionCallback('sellSynthUsd', parseInt(amounts.sellSynthUsd || '0'))} appearance="down">
                  Sell sUSD
                </Button>
              </div>
            </MintLineGrid>
          </MintLine>

          <MintLine>
            <h1>Synthetic ETH</h1>
            <MintLineGrid>
              <div>
                <Input
                  value={amounts.buySynthEth}
                  placeholder={'Amount (XTZ)'}
                  onChange={(e: any) => {
                    setAmounts({
                      ...amounts,
                      buySynthEth: e.target.value,
                    })
                  }}
                  onBlur={() => {}}
                  type={'text'}
                />
                <Button clickCallback={() => transactionCallback('buySynthEth', parseInt(amounts.buySynthEth || '0'))} appearance="up">
                  Buy sETH
                </Button>
              </div>
              <MintPrice>
                1 sETH = {prices.ETHUSD} USD
                <br />1 sETH = {prices.ETHUSD / prices.XTZUSD} XTZ
              </MintPrice>
              <div>
                <Input
                  value={amounts.sellSynthEth}
                  placeholder={'Amount (sETH)'}
                  onChange={(e: any) => {
                    setAmounts({
                      ...amounts,
                      sellSynthEth: e.target.value,
                    })
                  }}
                  onBlur={() => {}}
                  type={'text'}
                />
                <Button clickCallback={() => transactionCallback('sellSynthEth', parseInt(amounts.sellSynthEth || '0'))} appearance="down">
                  Sell sETH
                </Button>
              </div>
            </MintLineGrid>
          </MintLine>

          <MintLine>
            <h1>Synthetic BTC</h1>
            <MintLineGrid>
              <div>
                <Input
                  value={amounts.buySynthBtc}
                  placeholder={'Amount (XTZ)'}
                  onChange={(e: any) => {
                    setAmounts({
                      ...amounts,
                      buySynthBtc: e.target.value,
                    })
                  }}
                  onBlur={() => {}}
                  type={'text'}
                />
                <Button clickCallback={() => transactionCallback('buySynthBtc', parseInt(amounts.buySynthBtc || '0'))} appearance="up">
                  Buy sBTC
                </Button>
              </div>
              <MintPrice>
                1 sBTC = {prices.BTCUSD} USD
                <br />1 sBTC = {prices.BTCUSD / prices.XTZUSD} XTZ
              </MintPrice>
              <div>
                <Input
                  value={amounts.sellSynthBtc}
                  placeholder={'Amount (sBTC)'}
                  onChange={(e: any) => {
                    setAmounts({
                      ...amounts,
                      sellSynthBtc: e.target.value,
                    })
                  }}
                  onBlur={() => {}}
                  type={'text'}
                />
                <Button clickCallback={() => transactionCallback('sellSynthBtc', parseInt(amounts.sellSynthBtc || '0'))} appearance="down">
                  Sell sBTC
                </Button>
              </div>
            </MintLineGrid>
          </MintLine>
        </MintLines>
      ) : (
        <Button clickCallback={() => connectCallback()} appearance="primary">
          Connect Temple Wallet (Ghostnet)
        </Button>
      )}
    </MintStyled>
  )
}
