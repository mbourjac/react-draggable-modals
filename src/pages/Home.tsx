import { ProjectModal } from '../components/ProjectModal/ProjectModal';
import { PROJECTS } from './Home.constants';

export const Home = () => {
  return (
    <section>
      {PROJECTS.map(({ id, heading, description }) => (
        <ProjectModal key={id} heading={heading}>
          {description}
        </ProjectModal>
      ))}
    </section>
  );
};
