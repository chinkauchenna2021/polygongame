import React from 'react'
import * as S from './styles/Styles';

function TextArea({label , onChange = null , value=null}) {
  return (
    <div className='w-full flex justify-center flex-col items-center'>
    <div className='flex  w-5/6  lg:w-full mb-1'>
        <S.Label className='text-sm font-light' >{label}</S.Label>
    </div>
        <S.TextAreas value={value} onChange={onChange} className='border w-5/6 h-16 lg:w-full'>
            
        </S.TextAreas>
    </div>
  )
}

export default TextArea