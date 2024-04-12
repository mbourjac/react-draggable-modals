import { motion } from 'framer-motion';

type ProjectModalButtonProps = {
  isModalExpanded: boolean;
  onClick: () => void;
};

export const ProjectModalButton = ({
  isModalExpanded,
  onClick,
}: ProjectModalButtonProps) => {
  return (
    <button
      className="group border-l-2 border-blue-600 px-[0.875rem] hover:bg-blue-600"
      onClick={onClick}
    >
      <motion.svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-3 fill-blue-500 transition-colors group-hover:fill-white"
        animate={{ rotate: isModalExpanded ? 0 : 45 }}
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <path
            d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
            fillRule="evenodd"
          ></path>
        </g>
      </motion.svg>
    </button>
  );
};
