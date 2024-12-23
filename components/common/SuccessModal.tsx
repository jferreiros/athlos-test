import React from "react";
import Modal from "@/components/common/Modal";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Success Modal">
      <div className="flex flex-col items-center text-center gap-4">
        <Image src="/images/ok.png" alt="Ok Icon" width={100} height={100} />
        <p className="text-gray-700 mb-8 text-xl">{message}</p>
        <button
          onClick={onClose}
          className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-400"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default SuccessModal;
