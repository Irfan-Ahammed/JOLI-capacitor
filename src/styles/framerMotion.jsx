export const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

export const imageVariants = {
  hidden: { opacity: 0, x: -100 }, // Start from left (off-screen)
  visible: {
    opacity: 1,
    x: 0, // Center position
    transition: { duration: 0.8, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    x: -100, // Move off-screen to the right
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};


export const tableVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.3 }
  })
};

export const popoverVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2 } }
};