import { useRef, useState } from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useRandomPosition } from '../../hooks/use-random-position';
import { ProjectModalButton } from './ProjectModalButton';

type ProjectModalProps = {
  heading: string;
  children: ReactNode;
};

export const ProjectModal = ({ heading, children }: ProjectModalProps) => {
  const containerRef = useRef(null);
  const { randomLeft, randomTop } = useRandomPosition(containerRef);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandModal = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const variants = {
    inital: { x: randomLeft, y: randomTop, width: '25rem' },
    expanded: { x: 0, y: 0, width: '100vw', height: '100vw', zIndex: '1' },
  };

  return (
    <motion.div
      ref={containerRef}
      className="absolute"
      variants={variants}
      initial="inital"
      animate={isExpanded ? 'expanded' : 'inital'}
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
        <p className="px-4 py-2 text-xl font-medium">{children}</p>
      </article>
    </motion.div>
  );
};
