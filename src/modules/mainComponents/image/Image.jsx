import React from 'react'

function Image({ src = null, styles = null}) {
    return (
        <>
            {(src !== null) ?
                < img src={src} className={styles}  />
                :
                < img src={"https://www.shutterstock.com/image-vector/usdc-flat-icon-vector-illustration-260nw-1987286675.jpg"}  className = { styles } />    
            }
        
        </>

    )
}

export default Image