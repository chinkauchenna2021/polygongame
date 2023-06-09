import React from 'react'

function TableFooter({column1 , column2 , column3}) {
  return (
      <tr>
          <td className='px-8 lg:px-0 text-center'>{ column1}</td>
          <td className='px-8 lg:px-0 text-center'>{column2}</td>
          <td className='px-8 lg:px-0 text-center'>{ column3}</td>
    </tr>
  )
}

export default TableFooter