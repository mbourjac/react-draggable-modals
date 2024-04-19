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
  content,
  position: { zIndex },
}: ProjectModalProps) => {
  const modalRef = useRef<HTMLElement>(null);

  const { handleOnMouseDown } = useProjectModals();
  const { randomLeft, randomTop } = useRandomPosition(modalRef);

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
      width: '100vw',
      height: '100vh',
    },
  };

  const handleExpandModal = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);

    if (isExpanded) return;

    const modal = modalRef.current;

    if (!modal) {
      throw new Error('modalRef is not assigned');
    }

    const modalStyle = window.getComputedStyle(modal);
    const height = modalStyle.height;

    setRestHeight(height);
  };

  const handleOnDragEnd = () => {
    if (isExpanded) return;

    const modal = modalRef.current;

    if (!modal) {
      throw new Error('containerRef is not assigned');
    }

    const modalStyle = window.getComputedStyle(modal);
    const top = parseInt(modalStyle.top, 10);
    const left = parseInt(modalStyle.left, 10);

    const transformValues = modal.style.transform.match(/[-]?\d*\.?\d+/g) ?? [];

    const translateX = parseInt(transformValues[0] ?? '0', 10);
    const translateY = parseInt(transformValues[1] ?? '0', 10);

    setDraggedPosition({
      left: `${left + translateX}px`,
      top: `${top + translateY}px`,
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
