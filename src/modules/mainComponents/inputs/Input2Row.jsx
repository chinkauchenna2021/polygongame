import React from 'react'
import * as S from './styles/Styles';

function Input2Row({placeholder , label}) {
  return (
        <div className='w-full flex justify-center flex-col items-center'>
          <div className='flex  w-5/6  lg:w-full mb-1'>
              <S.Label className='text-sm font-light' >{label}</S.Label>
          </div>
          <S.Input  autoFocus className='border w-5/6 lg:w-full'  placeholder={placeholder} />
          
          



     </div>
  )
}

export default Input2Row