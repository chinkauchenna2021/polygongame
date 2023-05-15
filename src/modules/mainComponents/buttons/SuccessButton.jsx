import React from 'react';
import * as S from './styles'

function SuccessButton({name}) {
  return (
     <S.ButtonSuccess type='button' className=' flex flex-row justify-center  items-center cursor-pointer border capitalize w-full lg:w-full  bg-green-300 ring-1  ring-green-400 ring-offset-2  h-8 text-white mx-auto' >
     { name }
    </S.ButtonSuccess>
  )
}

export default SuccessButton