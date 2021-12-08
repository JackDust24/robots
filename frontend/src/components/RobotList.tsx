import PropTypes from 'prop-types';
import React from "react";
import RobotItem from "./RobotItem";

type Robot = {
  name: string;
  price: string;
  image: string;
  material: string;
  createdAt: string;
  stock: number;
  id: number;
}

const RobotList: React.FC<{ robotData: Robot[]; handleAddToCart: (robot: Robot) => void }> = (props) => {
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