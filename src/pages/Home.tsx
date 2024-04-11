import { ProjectModal } from '../components/ProjectModal';
import { PROJECTS } from './Home.constants';

export const Home = () => {
  return (
    <section className="flex flex-wrap">
      {PROJECTS.map(({ id, heading, description }) => (
        <ProjectModal key={id} heading={heading}>
          {description}
        </ProjectModal>
      ))}
    </section>
  );
};
