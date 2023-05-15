import React from 'react'
import { Link } from 'react-router-dom';
import { addressShortener } from '../../../Hook/useHook';

function TableBody({column1, column2 , column3 , column4}) {
    return (
      <tbody>
      <tr>
          <td className='px-8 lg:px-0 text-center'>{column1}</td>  
          <td className='px-8 lg:px-0 text-center'><Link className='text-blue-300 underline' to={`https://mumbai.polygonscan.com/address/${column2}`}>{addressShortener(column2)}</Link></td>  
                   <td className='px-8 lg:px-0 text-center'>{column4}</td>  
          <td className='px-8 lg:px-0 text-center'>{column3}</td>  
    </tr>
      </tbody>
  )
}

export default TableBody