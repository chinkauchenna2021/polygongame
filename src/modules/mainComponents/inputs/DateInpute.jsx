import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import * as S from './styles/Styles'

function DateInpute({label , startDateTime , setStartDateTime}) {
    return (
        <div  className='w-full flex justify-center flex-col items-center'>
          <div className='flex  w-5/6  lg:w-full mb-1'>
              <S.Label className='text-sm font-light' >{label}</S.Label>
          </div>
    <DatePicker
      className='border w-5/6 lg:w-full font-light pl-2 text-sm  mx-6 py-[2px] lg:mx-0 '
      selected={startDateTime}
      onChange={(date) => setStartDateTime(date)}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm:ss aa"
      showTimeInput
            />
    </div>
  );
}

export default DateInpute