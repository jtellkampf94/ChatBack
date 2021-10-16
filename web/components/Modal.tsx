interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div>
      <button onClick={onClose}>close</button>
      <h1>Modal</h1>
      {children}
    </div>
  );
};

export default Modal;
