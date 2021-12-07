/* 
    Helper fle for formatting price to THB currency and the date.
*/

import React from "react";

// format price to THB
export const formatPrice = (price) => {
  if (!price) {
    return "No Payment";
  }
  const realPrice = parseInt(price);
  return realPrice.toLocaleString("th-TH", {
    style: "currency",
    currency: "THB",
  });
};

// format date to DD/MM/YY
export const formatDate = (createdDate) => {
  const date = new Date(createdDate);
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return formattedDate;
};

// Count number of robots
export const countNumberOfRobots = (cart) => {
  const numberOfRobots = cart.reduce((robotTotal, robot) => {
    return robot.stock + robotTotal;
  }, 0); 
  return numberOfRobots;
}

// Work out total price in cart
export const countTotalPrice = (cart) => {
  const totalPrice = cart.reduce((robotTotal, robot) => {
    return parseInt(robot.price) * robot.stock + robotTotal;
  }, 0); 
  const formattedPrice = formatPrice(totalPrice)
  return formattedPrice;
}
