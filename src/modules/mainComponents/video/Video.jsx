import React from 'react'

function Video({src=null , styles=null}) {
    return (
      <>
        {
          (src == null)?
          <video  className={styles} src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/usd-coin-5827524-4850071.mp4" style={{mixBlendMode:"color-burn"}} autoPlay muted="muted" loop="loop" playsInline="" type="video/mp4"></video>
            :
          <video src={src} className={styles}  type="video/mp4"></video>        
                
        }
      </>
  )
}

export default Video