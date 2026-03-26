import { useEffect, useState } from "react";

export default function MagneticCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="hidden md:block pointer-events-none fixed z-[9999] w-6 h-6 rounded-full bg-accent blur-md opacity-60"
      style={{
        transform: `translate(${pos.x - 12}px, ${pos.y - 12}px)`
      }}
    />
  );
}