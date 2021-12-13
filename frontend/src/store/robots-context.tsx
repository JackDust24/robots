import React, { useState } from 'react';

import {RobotType} from '../model/RobotType';

// Set up the object
type RobotsContextObject = {
    robotDataItems: RobotType[];
    currentRobotsItems: RobotType[];
    filteredRobotsItems: RobotType[];
    cartItems: RobotType[];
    setInitialData: (data: {}) => void;
    addToCart: (robot: RobotType) => void;
    removeFromCart: (robot: RobotType) => void;
  };

// Set up the context
export const RobotsContext = React.createContext<RobotsContextObject>({
    robotDataItems: [],
    currentRobotsItems: [],
    filteredRobotsItems: [],
    cartItems: [],
    setInitialData: (data: {}) => {},
    addToCart: (robot: RobotType) => {},
    removeFromCart: (robot: RobotType) => {}
  });


  const RobotsContextProvider: React.FC = (props) => {
   
    const [robotData, setRobotData] = useState<RobotType[]>([]);
    // For Filtering
    const [filteredRobots, setFilteredRobots] = useState<RobotType[]>([]);
    // For Paginated Robots
    const [currentRobots, setCurrentRobots] = useState<RobotType[]>([]);
    const [cart, setCart] = useState<RobotType[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);


    // @ts-ignore
    const setInitialData = (data: any) => {
        setRobotData(data)
      }

    const setUpCurrentRobotsPerPage = () => {
        const endOffset: number = robotOffset + robotsPerPage;
        setCurrentRobots(robotData.slice(robotOffset, endOffset));
        setPageCount(Math.ceil(robotData.length / robotsPerPage));
    };

    // Robot being added to cart
    // @ts-ignore
    const handleAddToCart = (robot: RobotType) => {
        console.log("handleAddToCart ", robot)

        // Find if selected Robot is in the Cart list and the selected Robot from the Robot list
        const checkCartForItem = cart.find(
            (robotCart) => robotCart.id === robot.id
        );
        console.log("checkCartForItem ", checkCartForItem)

        const checkRobotDataForItem = robotData.find(
            (robotItem) => robotItem.id === robot.id
        );
        console.log("checkRobotDataForItem ", checkRobotDataForItem)

        const checkCurrentRobotDataForItem = currentRobots.find(
            (robotItem) => robotItem.id === robot.id
        );
        console.log("checkCurrentRobotDataForItem ", checkCurrentRobotDataForItem)
        const checkFilteredDataForItem = filteredRobots.find(
            (robotItem) => robotItem.id === robot.id
        );
        // Though unlikely to be called we will not add to cart if the stock is empty
        // @ts-ignore
        if (checkRobotDataForItem!.stock === 0) {
            console.log("2");
            return;
        }
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
        const newRobotData = robotData.map((robotItem) =>
            robotItem.id === robot.id
                ? {
                    ...checkRobotDataForItem!,
                    stock: checkRobotDataForItem!.stock - 1,
                }
                : robotItem
        )
        setRobotData(newRobotData)
        // This target would have to appear in this list too.
        const newRobots = currentRobots.map((robotItem) =>
            robotItem.id === robot.id
                ? {
                    ...checkCurrentRobotDataForItem!,
                    stock: checkCurrentRobotDataForItem!.stock - 1,
                }
                : robotItem
        )
        setCurrentRobots(newRobots)
        // We also want to update if we have filtered robots.
        if (checkFilteredDataForItem) {

            filteredRobots.map((robotItem) =>
                robotItem.id === robot.id
                    ? {
                        ...checkFilteredDataForItem,
                        stock: checkFilteredDataForItem.stock - 1,
                    }
                    : robotItem
            )
            setFilteredRobots(filteredRobots);
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
        const checkRobotDataForItem = robotData.find(
            (robotItem) => robotItem.id === robot.id
        );
        const checkCurrentRobotDataForItem = currentRobots.find(
            (robotItem) => robotItem.id === robot.id
        );
        const checkFilteredDataForItem = filteredRobots.find(
            (robotItem) => robotItem.id === robot.id
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
        // We then increase the robot count by one in the robot list.
        const newRobotData = robotData.map((robotItem) =>
            robotItem.id === robot.id
                ? {
                    ...checkRobotDataForItem!,
                    stock: checkRobotDataForItem!.stock + 1,
                }
                : robotItem
        )
        setRobotData(newRobotData)
        // This target would have to appear in this list too.
        if (currentRobots) {
            const newRobots = currentRobots.map((robotItem) =>
                robotItem.id === robot.id
                    ? {
                        ...checkCurrentRobotDataForItem!,
                        stock: checkCurrentRobotDataForItem!.stock + 1,
                    }
                    : robotItem

            )
            setCurrentRobots(newRobots)
        }
        // We also want to update if we have filtered robots.
        if (checkFilteredDataForItem) {
            setFilteredRobots(
                filteredRobots.map((robotItem) =>
                    robotItem.id === robot.id
                        ? {
                            ...checkFilteredDataForItem,
                            stock: checkFilteredDataForItem.stock + 1,
                        }
                        : robotItem
                )
            );
        }
    };



    const contextValue: RobotsContextObject = {
        robotDataItems: robotData,
        currentRobotsItems: currentRobots,
        filteredRobotsItems: filteredRobots,
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

