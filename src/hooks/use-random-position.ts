import { type RefObject, useMemo } from 'react';
import { useElementSize } from './use-element-size';

export const useRandomPosition = <T extends HTMLElement, U extends HTMLElement>(
  elementRef: RefObject<T>,
  containerRef: RefObject<U>,
) => {
  const { elementWidth, elementHeight } = useElementSize(elementRef);
  const { elementWidth: containerWidth, elementHeight: containerHeight } =
    useElementSize(containerRef);

  const randomLeft = useMemo(
    () => Math.random() * (containerWidth - elementWidth),
    [elementWidth, containerWidth],
  );
  const randomTop = useMemo(
    () => Math.random() * (containerHeight - elementHeight),
    [elementHeight, containerHeight],
  );

  return { randomLeft, randomTop };
};
