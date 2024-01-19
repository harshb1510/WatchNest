import React from 'react';

const ProductModal = ({ isOpen, onClose, product }) => {
  return (
    // Your modal implementation goes here
    // You can use a library like react-modal or create your own modal component
    // For simplicity, I'll provide a basic example
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {/* Render detailed product information here */}
        <h2>{product?.title}</h2>
        <img src={product?.img} alt="" style={{ width: "100px", height: "100px" }} />
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export default ProductModal;
