import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode } from '@/types/type'
import React from 'react'

//
const CursorsChat = ({ cursor,cursorState,setCursorState,updateMyPresence} : CursorChatProps) => {
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    
    setCursorState({mode : CursorMode.Chat , previousMessage : null , message : event.target.value});
    updateMyPresence({message : event.target.value});
  }
  const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      console.log('Enter pressed, sending message:', cursorState.message);
      setCursorState({mode : CursorMode.Chat , previousMessage : cursorState.message , message : ""});
    }
    else if(event.key === 'Escape'){
      console.log('Escape pressed, hiding message');
      setCursorState({mode : CursorMode.Hidden , previousMessage : null , message : ""});
    }
  }

  return (
    <div className='absolute top-0 left-0' style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>
       { cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color='#000' />
          <div className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]'>
            {
              cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )
            }

            <input
             className='z-10 w-60 border-none bg-transparent placeholder-white text-white outline-none ' 
             autoFocus = {true} 
             onKeyDown={handleKeyDown} 
             onChange={handleChange} 
             placeholder={cursorState.previousMessage ? '' : 'Type a message'}
             maxLength={50}
            />

          </div>

          

        </>
      )}
        
    
    </div>
  )
}

export default CursorsChat