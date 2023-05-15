import React from 'react';
import * as S from './styles/Styles'

function Inputs({value,name = null , min=null , readOnly = null , placeholder = null , label = null , type=null , onChange}) {
  return (
      <div className='w-full flex justify-center flex-col items-center'>
          <div className='flex  w-5/6  lg:w-full mb-1'>
              <S.Label className='text-sm font-light' >{label}</S.Label>
          </div>
           <S.Input name={name} min={min}  value={value} readOnly={readOnly} type={type}  autoFocus className='border w-5/6 lg:w-full' onChange={onChange}  placeholder={placeholder}/>   
      </div>
  )
}

export default Inputs