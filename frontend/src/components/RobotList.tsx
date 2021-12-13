import PropTypes from 'prop-types';
import React from "react";
import RobotItem from "./RobotItem";
import { RobotType } from '../model/RobotType';

// type Robot = {
//   name: string;
//   price: string;
//   image: string;
//   material: string;
//   createdAt: string;
//   stock: number;
//   id: number;
// }

const RobotList: React.FC<{ robotData: RobotType[]; handleAddToCart: (robot: RobotType) => void }> = (props) => {
  const { robotData, handleAddToCart } = props;
  console.log("Robot check - ", robotData)

  return (
    <React.Fragment>
      {robotData.map((robot) => (
        <RobotItem
          robot={robot}
          key={robot.id}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </React.Fragment>
  );
}

RobotList.propTypes = {
  robotData: PropTypes.array.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default RobotList;