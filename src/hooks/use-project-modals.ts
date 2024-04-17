import { useCallback, useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import type { ProjectModal } from '../components/ProjectModal/ProjectModal.types';
import type { Project } from '../pages/Home.types';

const projectModalsAtom = atom<ProjectModal[]>([]);

export const useProjectModals = (projects?: Project[]) => {
  const [projectModals, setProjectModals] = useAtom(projectModalsAtom);

  useEffect(() => {
    if (projects && projectModals.length === 0) {
      const initialProjectModals = projects.map((project, index) => ({
        ...project,
        position: { left: null, top: null, zIndex: index },
      }));

      setProjectModals(initialProjectModals);
    }
  }, [projects, projectModals, setProjectModals]);

  const getGreaterZIndex = useMemo(
    () => (projectModals: ProjectModal[]) =>
      Math.max(...projectModals.map(({ position }) => position.zIndex)) + 1,
    [],
  );

  const handleOnMouseDown = useCallback(
    (projectId: string) => {
      setProjectModals((prevProjectModals) =>
        prevProjectModals.map((projectModal) =>
          projectModal.id === projectId ?
            {
              ...projectModal,
              position: {
                ...projectModal.position,
                zIndex: getGreaterZIndex(prevProjectModals),
              },
            }
          : projectModal,
        ),
      );
    },
    [setProjectModals, getGreaterZIndex],
  );

  return { projectModals, handleOnMouseDown };
};
