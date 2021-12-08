import {
  Button,
  Card,
  Col,
  Row,
} from "react-bootstrap";

import CSS from 'csstype';
import NoImage from "../assets/images/noimage.png";
import PropTypes from 'prop-types';
import React from "react";
import { formatPrice } from "../utils/format";

type Robot = {
  name: string;
  price: string;
  image: string;
  material: string;
  createdAt: string;
  stock: number;
  id: number;
}

const CardStyle: CSS.Properties = {
  padding: `5px`,
};

const ImageStyles: CSS.Properties = {
  width: `50px`,
  objectFit: "fill",
  height: `50px`,
  // padding: `10px`,
  position: "relative",
  margin: `5px`,
};

const CardBodyStyle: CSS.Properties = {
  //   height: `30px`,
  width: `70%`,
  marginBottom: `5px`,
};

const CardBodyTitleStyle: CSS.Properties = {
  fontSize: `0.8rem`,
  color: `blue`,
  marginLeft: `60px`,
  marginBottom: `10px`,
  position: "absolute",
  top: `40px`,

};

const CardBodyPriceStyle: CSS.Properties = {
  fontSize: `0.8rem`,
  position: "absolute",
  // left: `25px`,
  padding: `10px`,
};


const CardBodyStockStyle: CSS.Properties = {
  fontSize: `1.4rem`,
  position: "absolute",
  // alignText: 'center',
  backgroundColor: `white`,
  width: `40px`,
  left: `40%`,
  right: `40px`,
  top: `20%`,
};

const CardButtonMinusStyle: CSS.Properties = {
  backgroundColor: `red`,
  color: `white`,
  width: `20%`,
  position: "absolute",
  left: `25px`,
};

const CardButtonPlustyle: CSS.Properties = {
  backgroundColor: `green`,
  color: `white`,
  width: `20%`,
  position: "absolute",
  right: `25px`,
};

const CartItem: React.FC<{ robot: Robot; handleAddToCart: (robot: Robot) => void; handleRemoveFromCart: (robot: Robot) => void }> = (props) => {
  const { robot, handleAddToCart, handleRemoveFromCart } = props;

  return (
    <div>
      <Col>
        <Card className="cart shadow" style={CardStyle}>
          <Card.Body style={{ position: `relative`, paddingBottom: `40px` }}>
            <Card.Img
              variant="top"
              src={robot.image ? `${robot.image}` : `${NoImage}`}
              alt={robot.name}
              style={ImageStyles}
            />
            <Card.Title style={CardBodyTitleStyle}>{robot.name}</Card.Title>
            <Card.Text
              className="wrap-text text-right"
              style={(CardBodyPriceStyle)}
            >
              Item Price: {formatPrice(robot.price)}
            </Card.Text>

          </Card.Body>
          <Card.Footer style={{ position: `relative`, height: `60px` }}>
            <Row>
              <Button
                onClick={() => handleRemoveFromCart(robot)}
                style={CardButtonMinusStyle}
              >
                -
              </Button>
              <Card.Text
                className="wrap-text text-center"
                style={(CardBodyStockStyle)}
              >
                {robot.stock ? `${robot.stock}` : `Out Of Stock`}
              </Card.Text>
              <Button
                onClick={() => handleAddToCart(robot)}
                style={CardButtonPlustyle}
              >
                +
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
    </div>
  );
};

// CartItem.propTypes = {
//   robot: PropTypes.object.isRequired,
//   handleAddToCart: PropTypes.func.isRequired,
//   handleRemoveFromCart: PropTypes.func.isRequired,
// };

export default CartItem;
