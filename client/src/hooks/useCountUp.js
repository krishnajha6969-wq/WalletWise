import { useState, useEffect, useRef } from 'react';

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const useCountUp = (target, duration = 1500, startOnMount = true) => {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!startOnMount || target === 0) {
      setValue(target);
      return;
    }

    setValue(0);
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setValue(easedProgress * target);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, startOnMount]);

  return value;
};

export default useCountUp;
