import React from 'react';
import { ShoppingCart, Edit, Trash2, Package } from 'lucide-react';
import { CATEGORY_EMOJIS } from '../../utils/constants';

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete, isAdmin }) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="sweet-card">
      <div className="sweet-image">
        {CATEGORY_EMOJIS[sweet.category] || '🍰'}
      </div>
      <div className="sweet-content">
        <div className="sweet-header">
          <div>
            <h3 className="sweet-name">{sweet.name}</h3>
            <span className="sweet-category">{sweet.category}</span>
          </div>
        </div>
        {sweet.description && (
          <p className="sweet-description">{sweet.description}</p>
        )}
        <div className="sweet-info">
          <div className="sweet-price">${sweet.price.toFixed(2)}</div>
          <div className={`sweet-stock ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`}>
            <Package size={16} />
            {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} in stock`}
          </div>
        </div>
        <div className="sweet-actions">
          {!isAdmin && (
            <button
              onClick={() => onPurchase(sweet)}
              className="btn btn-success"
              disabled={isOutOfStock}
              title={isOutOfStock ? 'Out of stock' : 'Purchase this sweet'}
            >
              <ShoppingCart size={16} />
              Purchase
            </button>
          )}
          {isAdmin && (
            <>
              <button
                onClick={() => onEdit(sweet)}
                className="btn btn-secondary"
                title="Edit this sweet"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => onDelete(sweet._id)}
                className="btn btn-danger"
                title="Delete this sweet"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;