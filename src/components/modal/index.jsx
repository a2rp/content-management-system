import { useEffect, useRef } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const Modal = ({ title, description, onClose, children, size = "medium" }) => {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusableSelector = "button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]";
    const initialFocus = dialogRef.current?.querySelector("[autofocus], [data-dialog-safe], input:not(:disabled), button:not(:disabled)");
    (initialFocus || dialogRef.current)?.focus();

    const handleKeyboard = (event) => {
      if (event.key === "Escape") {
        closeRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)];
      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();
        focusable.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
        event.preventDefault();
        focusable[0].focus();
      }
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  return (
    <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} tabIndex={-1} className={`${styles.dialog} ${size === "large" ? styles.large : ""}`} role="dialog" aria-modal="true" aria-labelledby="morrow-dialog-title" aria-describedby={description ? "morrow-dialog-description" : undefined}>
        <header className={styles.header}>
          <div><h2 id="morrow-dialog-title">{title}</h2>{description && <p id="morrow-dialog-description">{description}</p>}</div>
          <button className={styles.closeButton} type="button" aria-label="Close dialog" onClick={onClose}><FiX aria-hidden="true" /></button>
        </header>
        <div className={styles.body}>{children}</div>
      </section>
    </div>
  );
};

export const ConfirmDialog = ({ title, description, confirmLabel = "Delete story", cancelLabel = "Keep story", onConfirm, onClose, danger = true }) => (
  <Modal title={title} description={description} onClose={onClose}>
    <div className={styles.confirmation}>
      <span className={styles.warningIcon}><FiAlertTriangle aria-hidden="true" /></span>
      <div className={styles.actions}>
        <button type="button" data-dialog-safe="true" autoFocus onClick={onClose}>{cancelLabel}</button>
        <button type="button" className={danger ? styles.dangerButton : styles.primaryButton} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </div>
  </Modal>
);

export default Modal;
