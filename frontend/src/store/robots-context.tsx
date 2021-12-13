import React, { useState } from 'react';

import {RobotType} from '../model/RobotType';

// Set up the object
type RobotsContextObject = {
    robotData2: RobotType[];
    currentRobots2: RobotType[];
    filteredRobots2: RobotType[];
    handleAddToCart: (robot: RobotType) => void;
    handleRemoveFromCart: (robot: RobotType) => void;
  };

// // Set up the context
// export const RobotsContext = React.createContext<RobotsContextObject>({
//     robotData2: [],
//     currentRobots2: [],
//     filteredRobots2: [],
//     handleAddToCart: (robot: RobotType) => {},
//     handleRemoveFromCart: (robot: RobotType) => {}
//   });


//   const RobotsContextProvider: React.FC = (props) => {

//     return (
//         <RobotsContext.Provider value={contextValue}>
//           {props.children}
//         </RobotsContext.Provider>
//       );
//     };
    
//     export default RobotsContextProvider;

