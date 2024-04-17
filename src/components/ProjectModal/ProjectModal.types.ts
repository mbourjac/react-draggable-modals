import type { Project } from '../../pages/Home.types';

export type ProjectModal = Project & {
  position: { left: string | null; top: string | null; zIndex: number };
};
