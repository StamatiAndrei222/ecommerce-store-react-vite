import { DeliveryOptions } from "./DeliveryOptions.jsx";
import { CartItemDetails } from "./CartItemDetails.jsx";
import { DeliveryDate } from "./DeliveryDate.jsx";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {


        return (
          <div key={cartItem.id} className="cart-item-container">
            

            <div className="cart-item-details-grid">
              <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
              
              <CartItemDetails cartItem={cartItem} />

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

            </div>
          </div>
        );
      })}
    </div>
  );
}