import { useRef } from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { useElementSize } from '../hooks/use-element-size';
import { useWindowSize } from '../hooks/use-window-size';

type PositionRandomizerProps = {
  children: ReactNode;
};

export const PositionRandomizer = ({ children }: PositionRandomizerProps) => {
  const ref = useRef(null);
  const { elementWidth, elementHeight } = useElementSize(ref);
  const { windowWidth, windowHeight } = useWindowSize();

  const randomLeft = Math.random() * (windowWidth - elementWidth);
  const randomTop = Math.random() * (windowHeight - elementHeight);

  return (
    <div
      ref={ref}
      className="absolute"
      style={{ left: randomLeft, top: randomTop }}
    >
      {children}
    </div>
  );
};
