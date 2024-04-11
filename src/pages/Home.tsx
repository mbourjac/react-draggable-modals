import { PositionRandomizer } from '../components/PositionRandomizer';
import { ProjectModal } from '../components/ProjectModal';
import { PROJECTS } from './Home.constants';

export const Home = () => {
  return (
    <section>
      {PROJECTS.map(({ id, heading, description }) => (
        <PositionRandomizer key={id}>
          <ProjectModal heading={heading}>{description}</ProjectModal>
        </PositionRandomizer>
      ))}
    </section>
  );
};
