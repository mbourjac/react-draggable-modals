import { type RefObject, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useElementSize } from '../../hooks/use-element-size';
import { useProjectModals } from '../../hooks/use-project-modals';
import { useRandomPosition } from '../../hooks/use-random-position';
import type { ProjectModal as ProjectModalType } from './ProjectModal.types';
import { ProjectModalButton } from './ProjectModalButton';

type ProjectModalProps<T extends HTMLElement> = ProjectModalType & {
  containerRef: RefObject<T>;
};

export const ProjectModal = <T extends HTMLElement>({
  id,
  heading,
  description,
  content,
  position: { zIndex },
  containerRef,
}: ProjectModalProps<T>) => {
  const modalRef = useRef<HTMLElement>(null);

  const { handleOnMouseDown } = useProjectModals();
  const { randomLeft, randomTop } = useRandomPosition(modalRef, containerRef);
  const { elementWidth: containerWidth, elementHeight: containerHeight } =
    useElementSize(containerRef);

  const [isExpanded, setIsExpanded] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState<{
    left: string;
    top: string;
  } | null>(null);
  const [restHeight, setRestHeight] = useState<string | undefined>(undefined);

  const variants = {
    inital: {
      x: randomLeft,
      y: randomTop,
      width: '25rem',
    },
    rest: {
      x: draggedPosition ? draggedPosition.left : randomLeft,
      y: draggedPosition ? draggedPosition.top : randomTop,
      width: '25rem',
      height: restHeight,
    },
    expanded: {
      x: 0,
      y: 0,
      width: `${containerWidth}px`,
      height: `${containerHeight}px`,
    },
  };

  const handleExpandModal = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);

    if (isExpanded) return;

    const modal = modalRef.current;

    if (!modal) {
      throw new Error('modalRef is not assigned');
    }

    const { height } = window.getComputedStyle(modal);

    setRestHeight(height);
  };

  const handleOnDragEnd = () => {
    if (isExpanded) return;

    const modal = modalRef.current;

    if (!modal) {
      throw new Error('modalRef is not assigned');
    }

    const { transform } = window.getComputedStyle(modal);
    const { m41: translateX, m42: translateY } = new WebKitCSSMatrix(transform);

    setDraggedPosition({
      left: `${translateX}px`,
      top: `${translateY}px`,
    });
  };

  return (
    <motion.article
      ref={modalRef}
      className="absolute max-w-full cursor-grab overflow-hidden"
      style={{ zIndex }}
      variants={variants}
      initial="inital"
      animate={isExpanded ? 'expanded' : 'rest'}
      drag
      draggable={true}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{
        cursor: 'grabbing',
      }}
      onDragEnd={handleOnDragEnd}
      onMouseDown={() => {
        handleOnMouseDown(id);
      }}
    >
      <div className="h-full max-w-full border-2 border-blue-600 bg-white text-blue-800">
        <div className="flex border-b-2 border-blue-600">
          <h2 className="grow truncate px-4 py-2 font-semibold uppercase">
            {heading}
          </h2>
          <ProjectModalButton
            onClick={handleExpandModal}
            isModalExpanded={isExpanded}
          />
        </div>
        <div className="flex h-full flex-col gap-4 overflow-auto px-4 py-2 text-xl font-medium">
          <p>{description}</p>
          {isExpanded && <p>{content}</p>}
        </div>
      </div>
    </motion.article>
  );
};
