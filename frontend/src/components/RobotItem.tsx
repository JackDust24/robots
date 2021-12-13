import { Button, Card, Col } from "react-bootstrap";
import { formatDate, formatPrice } from "../utils/format";

import CSS from 'csstype';
import NoImage from "../assets/images/noimage.png";
import PropTypes from 'prop-types';
import React from "react";
import { RobotType } from "../model/RobotType";

// type Robot = {
//   name: string;
//   price: string;
//   image: string;
//   material: string;
//   createdAt: string;
//   stock: number;
//   id: number;
// }

const ImageStyles: CSS.Properties = {
  width: `80%`,
  objectFit: "fill",
  height: `150px`,
  padding: `10px`,
  marginLeft: `10%`,
  marginRight: `10%`,

};

const CardBodyTextStyle: CSS.Properties = {
  width: `100%`,
};

const CardBodyMaterialStyle: CSS.Properties = {
  fontSize: `0.9rem`,
  color: `blue`,
  marginBottom: `5px`,
};

const CardBodyPriceStyle: CSS.Properties = {
  fontWeight: `Bold`,
  color: `black`,
  fontSize: `1.0rem`,
  marginBottom: `5px`,
};

const CardBodyDateStyle: CSS.Properties = {
  fontSize: `0.7rem`,
  color: `black`,
  marginBottom: `5px`,
};

const CardBodyStockStyle: CSS.Properties = {
  fontSize: `0.8rem`,
  marginBottom: `5px`,
};

const CardButtonStyle: CSS.Properties = {
  width: `70%`,
  marginLeft: `15%`,
  marginRight: `15%`,
  maxWidth: `240px`,
};

const CardBodyStyle: CSS.Properties = {
  height: `160px`,
};

const RobotItem: React.FC<{ robot: RobotType; handleAddToCart: (robot: RobotType) => void }> = (props) => {
  const { robot, handleAddToCart } = props;

  return (
    // <div className="col-sm-4">
    <div>
      <Col>
        <Card className="card-robot shadow">
          <Card.Img
            variant="top"
            src={robot.image ? `${robot.image}` : `${NoImage}`}
            alt={robot.name}
            style={ImageStyles}
            className="card-deck-img"
          />
          <Card.Body style={CardBodyStyle}>
            <Card.Title>{robot.name}</Card.Title>
            <Card.Text
              className="wrap-text"
              style={(CardBodyMaterialStyle)}
            >
              Material: {robot.material}
            </Card.Text>
            <Card.Text
              className="wrap-text text-center"
              style={(CardBodyPriceStyle)}
            >
              Price: {formatPrice(robot.price)}
            </Card.Text>

            <Card.Text
              className="wrap-text"
              style={(CardBodyStockStyle)}
            >
              Items in Stock: {robot.stock ? `${robot.stock}` : `Out Of Stock`}
            </Card.Text>
            <Card.Text
              className="wrap-text text-muted"
              style={(CardBodyDateStyle)}
            >
              Robot created: {formatDate(robot.createdAt)}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button
              onClick={() => handleAddToCart(robot)}
              disabled={robot.stock <= 0}
              style={CardButtonStyle}
            >
              Add To Cart
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    </div>
  );
};

// RobotItem.propTypes = {
//   robot: PropTypes.object.isRequired,
//   handleAddToCart: PropTypes.func.isRequired,
// };

export default RobotItem;
