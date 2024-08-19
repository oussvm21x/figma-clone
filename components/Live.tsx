"use client";


import React, { use, useCallback, useEffect, useState } from 'react'
import LiveCursors from './Cursor/LiveCursors'
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from '@liveblocks/react';
import CursorsChat from './Cursor/CursorsChat';
import { CursorMode, CursorState, Reaction, ReactionEvent } from '@/types/type';
import ReactionSelector from './Reactions/ReactionButton';
import FlyingReaction from './Reactions/FyilngReactions';
import useInterval from '@/hooks/useInterval';
//A collection of all live functionalities that we implement in the app
 const Live = () => {
  const others = useOthers(); // this return a list of all other users connected to the app
  const [{cursor}, updateMyPresence] = useMyPresence() as any  ; 

  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });
  const [reaction, setReaction] = useState<Reaction[]>([]);
  const broadcast = useBroadcastEvent();
    const setReactions = useCallback((reaction : string) => {
      setCursorState({mode : CursorMode.Reaction , reaction , isPressed : false});
    }, []);

  useInterval(() => {
    setReaction((reactions) => {
      return reactions.filter((reaction) => Date.now() - reaction.timestamp < 2000);
    });
  }, 1000);

  useInterval(() => {
    if (cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {
      setReaction((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ])
      );
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      }); 
    }
  }, 100);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReaction((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    );
  });

  
  const handlePointerMove = useCallback((event : React.PointerEvent) => {
    
    event.preventDefault();

    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
            updateMyPresence({
              cursor: {
                x: Math.round(event.clientX),
                y: Math.round(event.clientY),
              },
            });
          }


  }, [cursorState.mode , setCursorState]);
  
  const handlePointerLeave = useCallback(() => {
    
    setCursorState({mode : CursorMode.Hidden});
    updateMyPresence({cursor: null , message : null}); 


  }, [cursorState.mode , setCursorState]);

  const handlePointerUp = useCallback(() => {
      
      setCursorState((state) =>
              state.mode === CursorMode.Reaction
                ? { ...state, isPressed: false }
                : state
            );
    }, [cursorState.mode , setCursorState]);


  const handlePointerDown = useCallback((event : React.PointerEvent) => {
    
    event.preventDefault();
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;
    updateMyPresence({cursor: {x, y}});

    setCursorState((state) =>
            state.mode === CursorMode.Reaction
              ? { ...state, isPressed: true }
              : state
          );


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
        else if (event.key === "e" || event.key === "E") {
          setCursorState({ mode: CursorMode.ReactionSelector });
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
      onPointerUp={handlePointerUp}
      className='h-[100vh] w-full flex justify-center items-center text-center border-4 border-white'
    >
      <h1 className="text-5xl text-white ">Figma clone</h1>
      {
        reaction.map((reaction) => (
          <FlyingReaction
            key = {reaction.timestamp.toString()}
            x = {reaction.point.x}
            y = {reaction.point.y}
            timestamp = {reaction.timestamp}
            value = {reaction.value}
          />
        ))
      }
      { cursor && (
        <CursorsChat
          cursor= {cursor} 
          cursorState= {cursorState}
          setCursorState= {setCursorState}
          updateMyPresence = {updateMyPresence}
        />
      )}

      {
        cursorState.mode === CursorMode.ReactionSelector && (
          <ReactionSelector
                setReaction={setReactions}
                x = {cursor.x}
                y = {cursor.y}
            />
        )
      }
      
      <LiveCursors others = {others} />

    </div>
  )
}

export default Live