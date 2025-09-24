export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const slideInLeft = {
  hidden: {
    x: -50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.4,
    },
  },
};

export const slideInRight = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

export const bookingDetailVariants = {
  hover: { x: 5 },
  transition: { type: "spring", stiffness: 300 },
};

export const cancelButtonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

export const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const filterVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut", delay: 0.1 },
  },
};

export const clearFilterButtonVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 15 },
  },
  hover: { scale: 1.1, rotate: 90 },
  tap: { scale: 0.9 },
};

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.8, y: 50 },
};

export const groupVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const noBookingsContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

export const animations = {
  containers: {
    containerVariants,
    itemVariants,
    noBookingsContainerVariants,
  },
  slides: {
    slideInLeft,
    slideInRight,
  },
  page: {
    pageVariants,
    pageTransition,
  },
  bookings: {
    cardVariants,
    bookingDetailVariants,
    cancelButtonVariants,
    headerVariants,
    dropdownVariants,
    filterVariants,
    clearFilterButtonVariants,
    groupVariants,
  },
  modal: {
    backdropVariants,
    modalVariants,
  },
};

export default animations;
