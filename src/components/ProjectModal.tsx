import type { ReactNode } from 'react';

type ProjectModalProps = {
  heading: string;
  children: ReactNode;
};

export const ProjectModal = ({ heading, children }: ProjectModalProps) => {
  return (
    <article className="w-[25rem] max-w-full border-2 border-blue-600 bg-white text-blue-800">
      <h2 className="truncate border-b-2 border-blue-600 px-4 py-2 font-semibold uppercase">
        {heading}
      </h2>
      <p className="px-4 py-2 text-xl font-medium">{children}</p>
    </article>
  );
};
