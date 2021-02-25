import { useState, useEffect } from 'react';

const useMousePos = () => {
  const [mousePos, setMousePos] = useState({ mx: 0, my: 0 });

  const updateMousePos = (ev) => {
    setMousePos({ mx: ev.clientX, my: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePos);

    return () => window.removeEventListener('mousemove', updateMousePos);
  }, []);

  return mousePos;
};

export default useMousePos;
