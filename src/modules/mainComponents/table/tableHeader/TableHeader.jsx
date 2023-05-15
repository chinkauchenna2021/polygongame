import React from 'react'

function TableHeader({column1 , column2 , column3}) {
  return (
    <thead>
    <tr>
      <th className='px-8 lg:px-0'>{column1}</th>
      <th  className='px-8 lg:px-0'>{column2}</th>
       <th className='px-8 lg:px-0'>{column3}</th>
    </tr>
    </thead>
  )
}

export default TableHeader