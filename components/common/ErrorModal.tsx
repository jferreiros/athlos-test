import React from "react";
import Modal from "@/components/common/Modal";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Error modal">
      <div className="flex flex-col items-center text-center">
        <FaExclamationTriangle className="text-red-500 text-3xl mb-4" />
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
