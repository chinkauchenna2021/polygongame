import React from 'react'

function Audios({src=null , styles , autoplay}) {
  return (
    <>
      {
        (src == null) ?
   <audio autoPlay={true} playsInline  className={styles} >
  <source src={"../../sound.mp3"} type="audio/mp3" />
   </audio>
          :
  <audio autoPlay={autoplay} className={styles}>
  <source src={src} type="audio/mp3" />
   </audio>     
    }
    </>
  )
}
export default Audios