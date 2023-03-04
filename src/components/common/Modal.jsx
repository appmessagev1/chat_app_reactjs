import React, { Children, useEffect } from "react";
import ReactModal from "react-modal";
import { GrFormClose } from 'react-icons/gr'

const Modal = ({ isOpen, handleOnClose, titleModal, content, children }) => {
  useEffect(() => {
    ReactModal.setAppElement("#App");
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      handleOnClose={handleOnClose}
      className="react-modal"
      overlayClassName="react-overlay"
      shouldCloseOnOverlayClick={true}>
      <div className="text-center font-medium text-base mb-6">{titleModal}</div>
      <div className="absolute right-4 top-4 cursor-pointer" onClick={handleOnClose}><GrFormClose size={24} /></div>
      {content && <div>{content}</div>}
      {children}
    </ReactModal>
  );
};

export default Modal;
