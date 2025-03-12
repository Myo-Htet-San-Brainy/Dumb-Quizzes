"use client";

import React, { useEffect, useRef, useState } from "react";

const Draggable: React.FC<{
  children: React.ReactNode;
  className?: string;
  draggableId: string;
  changeCurrentAnswer: (newValue: any[]) => void;
  currentAnswer?: any[];
  currentDropZoneId: string;
}> = ({
  children,
  className,
  draggableId,
  changeCurrentAnswer,
  currentAnswer,
  currentDropZoneId,
}) => {
  const [isDraggingThis, setIsDraggingThis] = useState(false);
  const [distanceToMove, setDistanceToMove] = useState({ x: 0, y: 0 });
  const initialMouseRef = useRef({ x: 0, y: 0 });
  const [currentDropzoneId, setCurrentDropzoneId] = useState(currentDropZoneId);
  // const initialPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDraggingThis) return;

    function handleMouseMove(e: any) {
      const distance = {
        x: e.clientX - initialMouseRef.current.x,
        y: e.clientY - initialMouseRef.current.y,
      };
      setDistanceToMove(distance);
    }

    function handleMouseUp(e: any) {
      const elementsUnder = document.elementsFromPoint(e.clientX, e.clientY);
      const dropzone = elementsUnder.find(
        (element) => element.getAttribute("data-is-dropzone") === "true"
      );
      const droppedId = dropzone?.getAttribute("id");
      const isOverOtherDraggable = elementsUnder.some(
        (element) =>
          element.getAttribute("data-is-draggable") === "true" &&
          element.getAttribute("id") !== draggableId
      );
      // console.log("droppedId", droppedId);
      // console.log("isOverOtherDraggable", isOverOtherDraggable);
      setIsDraggingThis(false);

      if (dropzone && !isOverOtherDraggable) {
        // update state
        const updatedAnswer = currentAnswer?.map((item: string[]) => {
          if (item[1] === droppedId) {
            item[0] = draggableId;
            return item;
          }
          if (item[1] === currentDropzoneId) {
            item[0] = "";
            return item;
          }
          return item;
        });
        changeCurrentAnswer(updatedAnswer as any[]);
        setCurrentDropzoneId(droppedId as string);
        setDistanceToMove({ x: 0, y: 0 });
      } else {
        // console.log("same state update");
        setDistanceToMove({ x: 0, y: 0 });
      }
    }
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDraggingThis]);

  function handleMouseDown(e: React.MouseEvent) {
    setIsDraggingThis(true);
    initialMouseRef.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  return (
    <div
      data-is-draggable="true"
      id={draggableId}
      onMouseDown={handleMouseDown}
      className={
        "h-full rounded-md  bg-indigo-600 cursor-move select-none " + className
      }
      style={{
        // position: "absolute",
        transform: `translate(${distanceToMove.x}px, ${distanceToMove.y}px)`,
        // touchAction: "none",
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
