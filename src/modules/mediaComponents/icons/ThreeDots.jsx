import React from 'react'
import * as S from '../styles/Styles'
import { BiDotsHorizontalRounded } from "react-icons/bi";

function ThreeDots({onClick}) {
  return (
      <S.DotIcon className='lg:hidden' onClick={onClick}>
          <BiDotsHorizontalRounded color='gray' size={30} />
     </S.DotIcon>
  )
}

export default ThreeDots