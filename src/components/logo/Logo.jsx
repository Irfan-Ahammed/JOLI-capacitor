import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

function Logo() {
  const letters = ["J", "O", "L", "I"];

  return (
    <Link to="/">
      <motion.div className="flex space-x-1 sm:text-4xl text-3xl  font-extrabold text-black dark:text-white">
        {letters.map((letter, index) => (
          <motion.span key={index} custom={index} initial="hidden" animate="visible" variants={textVariants}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </Link>
  );
}

export default Logo;
