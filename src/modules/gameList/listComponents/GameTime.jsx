import React from 'react'
import * as S from '../styles/Styles'

function GameTime({ gameTime }) {
  return (
      <S.GameTimeList className=''>
      <div className='tracking-widest text-xs lg:text-sm  font-bold pl-6 lg:pl-0' >{gameTime}</div>
    </S.GameTimeList>
  )
}

export default GameTime