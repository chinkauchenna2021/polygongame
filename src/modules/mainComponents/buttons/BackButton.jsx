import React from 'react'

function BackButton() {
    const back = () => {
        window.history.back();
    }
  return (
      <button  type="button" className='w-fit  py-2 px-10 absolute bottom-0 left-0 flex flex-row justify-center  text-sm items-center cursor-pointer border capitalize   bg-orange-400 ring-1  ring-orange-400 ring-offset-2  h-8 text-white mx-auto' onClick={()=>back()}>Back</button>
  )
}

export default BackButton