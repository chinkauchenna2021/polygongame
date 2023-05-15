import React from 'react'

function GameBtn({number , onClick}) {
  return (
      <button onClick={onClick} className='font-bold text-lg  m-2 rounded  w-24 h-14 border border-1  border-orange-400'>
          {number}
      </button>
  )
}

export default GameBtn