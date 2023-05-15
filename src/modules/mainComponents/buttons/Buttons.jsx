import React from 'react'

function Buttons({name , onClick}) {
  return (
      <button type='button' onClick={onClick} className=' flex flex-row justify-center rounded-full items-center cursor-pointer border bg-orange-600 capitalize  ring-1  ring-orange-400 ring-offset-2 w-28 h-10 text-white text-xs' >
     { name }
    </button>
  )
}

export default Buttons