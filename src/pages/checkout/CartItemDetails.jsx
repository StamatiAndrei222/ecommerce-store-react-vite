import { formatMoney } from '../../utils/money.js';
import axios from 'axios';
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {

  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const inputQuantity = async () => {
    if(isUpdatingQuantity){
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsUpdatingQuantity(false);
    }else{
      setIsUpdatingQuantity(true);
    }
  }

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isUpdatingQuantity
              ? <input className="input-quantity" type="text" value={quantity} onChange={(event) => {
                  setQuantity(event.target.value);
              }} onKeyDown={(event) => {
                if(event.key === 'Enter'){
                  inputQuantity();
                }else if(event.key === 'Escape'){
                  setIsUpdatingQuantity(false);
                  setQuantity(cartItem.quantity);
                }
              }}/>
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
            
          </span>
          <span className="update-quantity-link link-primary"
            onClick={inputQuantity}>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}