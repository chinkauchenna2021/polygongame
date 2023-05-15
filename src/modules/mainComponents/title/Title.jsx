import React from 'react'

function Title({game_title}) {
  return (
    <div className='mt-6 flex justify-center tracking-wide uppercase  font-semibold '>{ game_title}</div>
  )
}

export default Title