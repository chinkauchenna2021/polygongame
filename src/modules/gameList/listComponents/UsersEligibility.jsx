import React from 'react';
import * as S from '../styles/Styles'

function UsersEligibility() {
  return (
      <S.EligibleUser className='hidden'>
          <div className='w-2 h-2 rounded-full bg-green-300'>
          </div> 
      </S.EligibleUser>
  )
}

export default UsersEligibility