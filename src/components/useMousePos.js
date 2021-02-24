import { useState, useEffect } from 'react';

const useMousePos = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const updateMousePos = (ev) => {
    setMousePos({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePos);

    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);

  return mousePos;
};

export default useMousePos;
