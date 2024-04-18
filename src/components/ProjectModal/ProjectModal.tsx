import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useProjectModals } from '../../hooks/use-project-modals';
import { useRandomPosition } from '../../hooks/use-random-position';
import type { ProjectModal as ProjectModalType } from './ProjectModal.types';
import { ProjectModalButton } from './ProjectModalButton';

type ProjectModalProps = ProjectModalType;

export const ProjectModal = ({
  id,
  heading,
  description,
  position: { zIndex },
}: ProjectModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleOnMouseDown } = useProjectModals();
  const { randomLeft, randomTop } = useRandomPosition(containerRef);

  const [isExpanded, setIsExpanded] = useState(false);
  const [draggedPosition, setDraggedPosition] = useState<{
    left: string;
    top: string;
  } | null>(null);

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
    },
    expanded: {
      x: 0,
      y: 0,
      width: '100vw',
      height: '100vw',
    },
  };

  const handleExpandModal = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const handleOnDragEnd = () => {
    if (isExpanded) return;

    const container = containerRef.current;

    if (!container) {
      throw new Error('containerRef is not assigned');
    }

    const elementStyle = window.getComputedStyle(container);
    const top = parseInt(elementStyle.top, 10);
    const left = parseInt(elementStyle.left, 10);

    const transformValues =
      container.style.transform.match(/[-]?\d*\.?\d+/g) ?? [];

    const translateX = parseInt(transformValues[0] ?? '0', 10);
    const translateY = parseInt(transformValues[1] ?? '0', 10);

    setDraggedPosition({
      left: `${left + translateX}px`,
      top: `${top + translateY}px`,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute cursor-grab"
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
      <article className="h-full max-w-full border-2 border-blue-600 bg-white text-blue-800">
        <div className="flex border-b-2 border-blue-600">
          <h2 className="grow truncate px-4 py-2 font-semibold uppercase">
            {heading}
          </h2>
          <ProjectModalButton
            onClick={handleExpandModal}
            isModalExpanded={isExpanded}
          />
        </div>
        <p className="px-4 py-2 text-xl font-medium">{description}</p>
      </article>
    </motion.div>
  );
};
