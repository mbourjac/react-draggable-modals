import { ProjectModal } from '../components/ProjectModal/ProjectModal';
import { useProjectModals } from '../hooks/use-project-modals';
import { PROJECTS } from './Home.constants';

export const Home = () => {
  const { projectModals } = useProjectModals(PROJECTS);

  return (
    <section className="h-screen w-screen">
      {projectModals.map((projectModal) => (
        <ProjectModal key={projectModal.id} {...projectModal} />
      ))}
    </section>
  );
};
