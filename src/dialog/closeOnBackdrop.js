export const closeOnBackdrop = (e, close) => {
  if (e.target === e.currentTarget) close();
};
