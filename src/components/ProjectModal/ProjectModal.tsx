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
  const containerRef = useRef(null);
  const { handleOnMouseDown } = useProjectModals();
  const { randomLeft, randomTop } = useRandomPosition(containerRef);
  const [isExpanded, setIsExpanded] = useState(false);

  const variants = {
    inital: {
      x: randomLeft,
      y: randomTop,
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

  return (
    <motion.div
      ref={containerRef}
      className="absolute cursor-grab"
      style={{ zIndex }}
      onMouseDown={() => {
        handleOnMouseDown(id);
      }}
      variants={variants}
      initial="inital"
      animate={isExpanded ? 'expanded' : 'inital'}
      drag
      draggable={true}
      dragElastic={0}
      dragMomentum={false}
      whileDrag={{
        cursor: 'grabbing',
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
