import CursorSVG from '@/public/assets/CursorSVG'
import { CursorChatProps, CursorMode, CursorState } from '@/types/type'
import React from 'react'

//
const CursorsChat = ({ cursor,cursorState,setCursorState,updateMyPresence} : CursorChatProps) => {
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({message : event.target.value});
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: event.target.value,
    });
  }
  const handleKeyDown = (event : React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter'){
      console.log('Enter pressed, sending message:', cursorState.message);
      
      setCursorState({mode : CursorMode.Chat , message : "" ,previousMessage : cursorState.message });
    }
    else if(event.key === 'Escape'){
      console.log('Escape pressed, hiding message');
      setCursorState({mode : CursorMode.Hidden });
    }
  }

  return (
    <div className='absolute top-0 left-0' style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>
       { cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color='#000' />
          <div className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px] flex flex-col items-start'
            onKeyUp={(e)=>e.stopPropagation()}
          >
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
             value={cursorState.message}
            />

          </div>

          

        </>
      )}
        
    
    </div>
  )
}

export default CursorsChat