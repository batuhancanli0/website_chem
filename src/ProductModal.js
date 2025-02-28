// src/ProductModal.js
import React from "react";
import "./ProductModal.css";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="modal-image"
        />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductModal;
