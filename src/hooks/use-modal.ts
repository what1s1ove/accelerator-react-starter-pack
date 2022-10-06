import { useCallback, useEffect, useState } from 'react';

export const useModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);
  const handleModalOpen = () => setIsModalShown(true);
  const handleModalClose = () => setIsModalShown(false);

  const handleEscKeyDown = useCallback((evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      handleModalClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);

    if (isModalShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [handleEscKeyDown, isModalShown]);

  return [
    isModalShown,
    handleModalOpen,
    handleModalClose,
  ] as const;
};
