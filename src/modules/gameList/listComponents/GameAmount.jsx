import React  from 'react'
import * as S from "../styles/Styles"
import BigNumber from 'bignumber.js'
function GameAmount({ amount = null }) {
  const usdcDecimal = 1e6
  const bn = Number(new BigNumber(amount).dividedBy(usdcDecimal));
  return (
      <S.GameAmountList  >
          <div className=' text-xs lg:text-sm font-bold flex justify-center items-center'>{bn + " USDC"}</div>      
     </S.GameAmountList>
  )
}

export default GameAmount