import styled from 'styled-components/macro'
import { FullPage } from 'styles'

export const MintStyled = styled(FullPage)`
  margin-top: 100px;
  text-align: center;

  > button {
    margin: 100px auto !important;
    width: 600px !important;
  }
`

export const MintLines = styled.div``

export const MintLine = styled.div`
  margin-top: 100px;

  input {
    width: 100%;
    margin: 20px auto;
  }

  button {
    width: 100%;
  }
`

export const MintLineGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 400px 200px;
  grid-gap: 10px;
  margin: auto;
  width: 820px;
`

export const MintPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-around;
`
