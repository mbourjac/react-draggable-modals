import { useRef } from 'react';
import { ProjectModal } from '../components/ProjectModal/ProjectModal';
import { useProjectModals } from '../hooks/use-project-modals';
import { PROJECTS } from './Home.constants';

export const Home = () => {
  const { projectModals } = useProjectModals(PROJECTS);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="h-screen w-screen">
      <div className="h-full w-full" ref={containerRef}>
        {projectModals.map((projectModal) => (
          <ProjectModal
            key={projectModal.id}
            {...projectModal}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
};
