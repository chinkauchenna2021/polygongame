import React from 'react'

function NormalButtons({name , onClick , eligibles = null}) {
  return (
    <button disabled={eligibles} onClick={onClick} type='button' className=' flex flex-row justify-center  text-sm items-center cursor-pointer border capitalize w-5/6 lg:w-full  bg-orange-400 ring-1  ring-orange-400 ring-offset-2  h-8 text-white mx-auto' >
     { name }
    </button>
  )
}

export default NormalButtons