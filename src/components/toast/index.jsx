import { useEffect } from "react";
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const icons = { success: FiCheckCircle, error: FiAlertCircle, info: FiInfo };

const Toast = ({ message, tone = "success", onDismiss }) => {
  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(onDismiss, 4200);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;
  const Icon = icons[tone] || icons.success;

  return (
    <div className={`${styles.toast} ${styles[tone] || ""}`} role={tone === "error" ? "alert" : "status"}>
      <Icon aria-hidden="true" />
      <span>{message}</span>
      <button type="button" aria-label="Dismiss notification" onClick={onDismiss}><FiX aria-hidden="true" /></button>
    </div>
  );
};

export default Toast;
