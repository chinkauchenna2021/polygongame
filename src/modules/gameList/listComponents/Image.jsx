import React from 'react';
import * as S from '../styles/Styles'
// src="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
function Image({ Img }) {
  console.log("new image "+ Img)
  return (
      <S.Images className='h-10 w-10'>
          <img className='rounded-full' src={"https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"} />
    </S.Images>
  )
}

export default Image