// prettier-ignore
import { MintStyled } from './Mint.style'

type MintViewProps = {
  mintCallback: () => void
  connectCallback: () => void
  loading: boolean
  accountPkh?: string
}

export const MintView = ({ mintCallback, connectCallback, loading, accountPkh }: MintViewProps) => {
  return (
    <MintStyled>
      {accountPkh ? (
        <button onClick={() => mintCallback()}>Mint sUSD</button>
      ) : (
        <button onClick={() => connectCallback()}>Connect Temple Wallet (Ghostnet)</button>
      )}
    </MintStyled>
  )
}
