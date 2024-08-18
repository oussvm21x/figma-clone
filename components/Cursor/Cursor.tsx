import CursorSVG from '@/public/assets/CursorSVG'
import React from 'react'
type Props = {
    color: string,
    x: number,
    y: number,
    message: string
    }

const Cursor = ( {color  , x , y ,  message}:Props ) => {

  console.log('rendering this message', message)
  return (
    <div className='pointer-events-none absolute top-0 left-0' style={{ transform: `translate(${x}px, ${y}px)` }} >

        <CursorSVG color={color} />
        { message && (
          <div>
            <p>{message}</p>
          </div>
        )
      }
    </div>
  )
}

export default Cursor