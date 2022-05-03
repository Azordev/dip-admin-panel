import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.scss';

type Props = {
  title: string;
  isOpened: boolean;
  onProceed: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({
  title,
  isOpened,
  onProceed,
  onClose,
  children,
}: Props) => {
  const ref: any = useRef(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpened]);

  useEffect(() => {
    const handleCancel = (event: React.ChangeEvent) => {
      event.preventDefault();
      onClose();
    }
    ref.current?.addEventListener('cancel', handleCancel);
  
    return () => {
      ref.current?.removeEventListener('cancel', handleCancel);
    }
  }, [onClose]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <dialog ref={ref} onClick={onClose} className={styles.container}>
      <div onClick={preventAutoClose}>
        <h3>{title}</h3>

        {children}

        <div className={styles.buttons}>
          <button onClick={proceedAndClose}>Proceed</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal
