import { type RefObject, useMemo } from 'react';
import { useElementSize } from './use-element-size';
import { useWindowSize } from './use-window-size';

export const useRandomPosition = <T extends HTMLElement>(
  elementRef: RefObject<T>,
) => {
  const { elementWidth, elementHeight } = useElementSize(elementRef);
  const { windowWidth, windowHeight } = useWindowSize();

  const randomLeft = useMemo(
    () => Math.random() * (windowWidth - elementWidth),
    [elementWidth, windowWidth],
  );
  const randomTop = useMemo(
    () => Math.random() * (windowHeight - elementHeight),
    [elementHeight, windowHeight],
  );

  return { randomLeft, randomTop };
};
