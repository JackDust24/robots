import React, { useState } from 'react';

import {RobotType} from '../model/RobotType';

// Set up the object
type RobotsContextObject = {
    cartItems: RobotType[];
    addToCart: (robot: RobotType) => void;
    removeFromCart: (robot: RobotType) => void;
  };

// Set up the context
export const RobotsContext = React.createContext<RobotsContextObject>({
    cartItems: [],
    addToCart: (robot: RobotType) => {},
    removeFromCart: (robot: RobotType) => {}
  });


  const RobotsContextProvider: React.FC = (props) => {
   
    const [cart, setCart] = useState<RobotType[]>([]);

    // Robot being added to cart
    // @ts-ignore
    const handleAddToCart = (robot: RobotType) => {
        console.log("handleAddToCart ", robot)

        // Find if selected Robot is in the Cart list and the selected Robot from the Robot list
        const checkCartForItem = cart.find(
            (robotCart) => robotCart.id === robot.id
        );
        console.log("checkCartForItem ", checkCartForItem)

        // If robot is in the cart then increase the stock by one, otherwise creeate a new robot in cart
        if (checkCartForItem) {
            setCart(
                cart.map((robotCart) =>
                    robotCart.id === robot.id
                        ? { ...checkCartForItem, stock: checkCartForItem.stock + 1 }
                        : robotCart
                )
            );
        } else {
            // Check Cart to see if more than 5 types exist
            if (cart.length > 4) {
                alert(
                    "You have reached the maximum number of Robots allowed for adding to the cart"
                );
                return;
            } else {
                setCart([...cart, { ...robot, stock: 1 }]);
            }
        }

    };

    // const handleRemoveFromCart: React.FC<{handleRemoveFromCart: (robot: Robot) => void }>
    // @ts-ignore
    const handleRemoveFromCart = (robot: RobotType) => {
        console.log("Handle Remove from car", robot)
        // Find if selected Robot is in the Cart list and the selected Robot from the Robot list
        const checkCartForItem = cart.find(
            (robotCart) => robotCart.id === robot.id
        );

        // We can check if the item being removed is 1, then we can remove the robot from the cart altogether.
        //  If not, then we just decrease the stock count by one.

        if (checkCartForItem!.stock === 1) {
            // Use filter to remove it from the cart
            setCart(cart.filter((robotCart) => robotCart.id !== robot.id));
        } else {

            const newCart = cart.map((robotCart) =>
                robotCart.id === robot.id
                    ? { ...checkCartForItem!, stock: checkCartForItem!.stock - 1 }
                    : robotCart
            )

            setCart(newCart)
        }
    };

    const contextValue: RobotsContextObject = {
        cartItems: cart,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
      };

    return (
        <RobotsContext.Provider value={contextValue}>
          {props.children}
        </RobotsContext.Provider>
      );
    };
    
    export default RobotsContextProvider;

