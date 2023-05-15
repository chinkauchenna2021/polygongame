import React from 'react'

function TableBody({column1, column2 , column3}) {
    return (
      <tbody>
      <tr>
          <td className='px-8 lg:px-0 text-center'>{column1}</td>  
          <td className='px-8 lg:px-0 text-center'>{column2}</td>  
          <td className='px-8 lg:px-0 text-center'>{column3}</td>  
    </tr>
      </tbody>
  )
}

export default TableBody