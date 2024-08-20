"use client";

import LeftSidebar from "../components/LeftSidebar";
import Live from "../components/Live";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import { handleCanvasMouseDown, handleResize, initializeFabric } from "@/lib/canvas";
import { useEffect, useRef } from "react";
import * as fabric from "fabric";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const isDrawing  = useRef<boolean>(false); 
  const shapeRef  = useRef<fabric.Object | null>(null);
  const selectedShapeRef  = useRef<string | null>('rectangle');

  useEffect(() => {
    const canvas = initializeFabric({ 
        canvasRef,
        fabricRef,
       });
    const handleMouseDown = (options: fabric.TEvent<MouseEvent | TouchEvent>) => {
      console.log('mouse down', options);
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      });
    };

    canvas.on("mouse:down", handleMouseDown);


    // Handle window resize event
     window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current,
      });
    });


    // Cleanup on unmount
    return () => {
      canvas.dispose();
      window.removeEventListener("resize", () => {
        handleResize({
          canvas: null,
        });
      });
    };
  }, []);

  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      { <section className="flex flex-row h-full ">
        <LeftSidebar />
        <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section> }
    </main>
  );
}
