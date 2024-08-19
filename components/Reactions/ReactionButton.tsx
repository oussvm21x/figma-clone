import React from "react";

type Props = {
  setReaction: (reaction: string) => void;
  x: number;  // Add x prop for the cursor's X coordinate
  y: number;  // Add y prop for the cursor's Y coordinate
};

export default function ReactionSelector({ setReaction , x , y }: Props) {
  return (
    <div
      className="-translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white px-2"
      style={{
        position: 'absolute',  // Make sure the component is absolutely positioned
        left: x,  // Use the cursor's X coordinate
        top: y,   // Use the cursor's Y coordinate
        boxShadow:
          "0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      onPointerMove={(e) => e.stopPropagation()}
    >
      <ReactionButton reaction="👍" onSelect={setReaction} />
      <ReactionButton reaction="🔥" onSelect={setReaction} />
      <ReactionButton reaction="😍" onSelect={setReaction} />
      <ReactionButton reaction="👀" onSelect={setReaction} />
      <ReactionButton reaction="😱" onSelect={setReaction} />
      <ReactionButton reaction="🙁" onSelect={setReaction} />
    </div>
  );
}

function ReactionButton({
  reaction,
  onSelect,
}: {
  reaction: string;
  onSelect: (reaction: string) => void;
}) {
  return (
    <button
      className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => onSelect(reaction)}
    >
      {reaction}
    </button>
  );
}