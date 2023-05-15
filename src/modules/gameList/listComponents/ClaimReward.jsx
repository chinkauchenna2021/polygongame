import React from 'react';
import * as S from '../styles/Styles'

function ClaimReward() {
  return (
    <S.Claim  className=' hidden  w-16 h-6 rounded-full  ring-1 ring-orange-400 ring-offset-2 bg-orange-400 lg:flex justify-center items-center'> 
      <div className='text-xs text-white w-fit h-fit'>Claim</div>
      </S.Claim>
  )
}

export default ClaimReward