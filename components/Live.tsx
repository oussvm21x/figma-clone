"use client";


import React, { use, useCallback, useEffect, useState } from 'react'
import LiveCursors from './Cursor/LiveCursors'
import { useMyPresence, useOthers } from '@liveblocks/react';
import CursorsChat from './Cursor/CursorsChat';
import { CursorMode, CursorState } from '@/types/type';
//A collection of all live functionalities that we implement in the app
 const Live = () => {
  const others = useOthers(); // this return a list of all other users connected to the app
  const [{cursor}, updateMyPresence] = useMyPresence() as any  ; 

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const handlePointerMove = useCallback((event : React.PointerEvent) => {
    
    event.preventDefault();

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({
      cursor: {
        x,
        y,
      },
    });


  }, []);
  
  const handlePointerLeave = useCallback(() => {
    
    setCursorState({mode : CursorMode.Hidden});
    updateMyPresence({cursor: null , message : null}); 


  }, []);


  const handlePointerDown = useCallback((event : React.PointerEvent) => {
    
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({cursor: {x, y}});


  }, []);

  useEffect(() => {
    const onKeyUp = (event : KeyboardEvent) => {
        if (event.key === '/') {
          setCursorState({mode : CursorMode.Chat , previousMessage : null , message : ""});
        }
        else if(event.key === 'Escape'){
          setCursorState({mode : CursorMode.Hidden});
          updateMyPresence({message : ""}); 
        }
    }

    const onKeyDown = (event : KeyboardEvent) => {
      if(event.key === '/'){
        event.preventDefault();
      }
    }


    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);

    }
  } , [updateMyPresence] ) ; 

  return (
    <div
      onPointerDown={ handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className='h-[100vh] w-full flex justify-center items-center text-center border-4 border-white'
    >
      <h1 className="text-5xl text-white ">Figma clone</h1>
      { cursor && (
        <CursorsChat
          cursor= {cursor} 
          cursorState= {cursorState}
          setCursorState= {setCursorState}
          updateMyPresence = {updateMyPresence}
        />
      )}
      <LiveCursors others = {others} />

    </div>
  )
}

export default Live