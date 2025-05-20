import { createPortal } from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  if (!show) return null;
  return createPortal(
    <div>
      <div>
        <h3>{title}</h3>
        {content}
        <div>
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
