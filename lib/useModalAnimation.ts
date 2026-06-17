import { useEffect, useRef, useState } from "react";

export function useModalAnimation(isOpen: boolean, duration = 260) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animatingOut, setAnimatingOut] = useState(false);
  const isRendered = useRef(isOpen);

  useEffect(() => {
    if (isOpen) {
      isRendered.current = true;
      setShouldRender(true);
      setAnimatingOut(false);
    } else if (isRendered.current) {
      setAnimatingOut(true);
      const t = setTimeout(() => {
        isRendered.current = false;
        setShouldRender(false);
        setAnimatingOut(false);
      }, duration);
      return () => clearTimeout(t);
    }
  }, [isOpen, duration]);

  return { shouldRender, animatingOut };
}
