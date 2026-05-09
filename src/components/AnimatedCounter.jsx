import { useEffect, useState } from 'react';

export default function AnimatedCounter({ target, suffix = '', duration = 2000, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();
    let animId;
    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setCount(Math.floor(ease * target));
      if (t < 1) animId = requestAnimationFrame(tick);
      else setCount(target);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [active, target, duration]);

  return <>{count}{suffix}</>;
}
