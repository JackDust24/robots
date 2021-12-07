import "../routes/Home.css";

import { countNumberOfRobots, countTotalPrice } from "../utils/format";

import CartItem from "./CartItem";
import PropTypes from 'prop-types';
import React from "react";

export default function Cart(props) {
  const { cart, handleAddToCart, handleRemoveFromCart } = props;
  const numberOfRobots = countNumberOfRobots(cart);
  const totalPriceOfRobots = countTotalPrice(cart);

  return (
    <div className="cart-container" style={{ border: "solid", borderWidth: `thin`, marginTop: `10px`, padding: `5px` }}>
      <h2 className="text-center">Cart</h2>
      {cart.length === 0 && <div>Cart is empty</div>}
      {cart.map((robot) => (
        <CartItem
          robot={robot}
          key={robot.id}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      {cart.length !== 0 && (
        <React.Fragment>
        <hr />
          <div className="row" style={{paddingLeft: `5px`}}>
            <div className="col" style={{fontSize: `0.8rem`}}>Total Robots: </div>
            <div className="col text-right" style={{fontSize: `0.8rem`}}><strong>{numberOfRobots}</strong></div>
          </div>
          <div className="row" style={{paddingLeft: `5px`}}>
            <div className="col" style={{fontSize: `0.9rem`}}>
              <strong>{" "}Total Price:</strong>
            </div>
            <div className="col text-right">
              <strong>{totalPriceOfRobots}</strong>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );

}

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleRemoveFromCart: PropTypes.func.isRequired,
};
