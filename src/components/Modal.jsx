import React from 'react';
import Modal from 'react-modal';

// Set the root element for accessibility purposes
Modal.setAppElement('#root');

const DynamicModal = ({ isOpen, onClose, children, width, height }) => {
  const customStyles = {
    content: {
      width: width ?? "50%",
      height: height ?? "40%",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: '#24114B',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000, // Ensure overlay is on top
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles} // Correctly pass custom styles
      contentLabel="Dynamic Modal"
    >
      {children}
    </Modal>
  );
};

export default DynamicModal;
