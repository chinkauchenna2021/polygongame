import React from 'react';
import * as S from '../styles/Styles'

function Title({title=null}) {
  return (
      <S.Title>
          <div className='w-fit capitalize font-semibold text-slate-500  text-sm'>{title}</div>
    </S.Title>
  )
}

export default Title