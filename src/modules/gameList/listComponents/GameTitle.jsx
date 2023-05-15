import React from 'react'
import ListLayout from '../layout/ListLayout'

function GameTitle() {
  return (
      <ListLayout className="w-full h-6   flex justify-center" borderProperties = "">
   
          
           <div className='flex  flex-row w-5/12 lg:w-5/12 space-x-9 h-full items-center '>
                <div className='w-fit h-fit font-semibold text-sm tracking-wide'>Image</div>
              <div className='w-fit h-fit  font-semibold text-sm tracking-wide'>Title</div>
          </div>
          <div className='flex flex-row w-7/12 lg:w-7/12 justify-between items-center h-full'>
            <div className='w-fit h-fit font-semibold text-sm tracking-wide'>Min Bet</div>
                  <div className='w-fit h-fit hidden font-semibold  tracking-wide  '>status</div>
                 <div className=' w-fit h-fit capitalize font-semibold text-sm tracking-wide  lg:pr-8' >end time</div>
                 <div className='w-fit h-fit  capitalize flex lg:hidden font-semibold  tracking-wide'>more</div>
                 <div className='w-fit h-fit hidden lg:flex font-semibold tracking-wide'>Claim</div>

          </div>
   
   
   
   
   
   
   
          {/* //       <div className='w-11/12 flex justify-between items-center'>
    //           <div className='flex justify-center lg:justify-start space-x-7 lg:space-x-10 lg:w-5/12'>
    //               <div className='w-fit h-fit'>Image</div>
    //               <div className='w-fit h-fit'>Title</div>
    //           </div>

              
    //            <div className='w-fit flex flex-row space-x-5 lg:w-7/12 lg:justify-between'>
    //               <div className='w-fit h-fit'>Min Bet</div>
    //               <div className='w-fit h-fit hidden lg:flex'>Eligibility</div>
    //               <div className=' capitalize' >close time</div>
    //               <div className='capitalize flex lg:hidden'>more</div>
    //               <div className='w-fit h-fit hidden lg:flex'>Claim</div>
    //           </div> */}
               {/* <div className=''>
              </div>
               <div className='w-fit h-fit flex lg:hidden'>
              </div>
               <div className='hidden lg:flex'>
              </div>
           */}
       {/* </div>   */}
          
    </ListLayout>
  )
}

export default GameTitle