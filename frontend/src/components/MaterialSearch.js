import { Button, Form, InputGroup } from "react-bootstrap";
import React, { useState } from "react";

import PropTypes from 'prop-types';

const MaterialSearch = (props) => {
  const [value, setValue] = useState(0);
  const [textTest, setTextTest] = useState("Initial text")
  const { materials, handleSelectMaterial, handleMaterialReset } = props;

  const changeTestState = () => {
    setTextTest("Jason")
  }

  return (
    <React.Fragment>
      <div className="material-search">
        <div style={{ marginRight: `30px` }}>
          {materials && (
            <Form className="search-material-form search-bar">
              <InputGroup className="search-bar">
                <Form.Group controlId="exampleForm.SelectMaterial">
                  <Form.Select
                    as="select"
                    className="search-select"
                    onChange={(e) => {
                      handleSelectMaterial(e.target.value);
                      setValue(e.target.value);
                    }}
                    value={value}
                    size="lg"
                  >
                    <option value="0">Choose Material...</option>
                    {materials.map((material) => (
                      <option key={material} value={material}>
                        {material}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </InputGroup>
            </Form>
          )}
        </div>
        <Button
          onClick={() => {
            setValue(1);
            handleMaterialReset(true);
          }}
          style={{
            backgroundColor: `#13d558`,
            color: `white`,
            fontSize: `1.4rem`
          }}
        >
          Reset
        </Button>
        <p>{textTest}</p>
        <Button
          onClick={changeTestState}
          style={{
            backgroundColor: `#13d558`,
            color: `white`,
            fontSize: `1.4rem`
          }}
        >
           Material Check
        </Button>
      </div>
    </React.Fragment>
  );
};

MaterialSearch.propTypes = {
  materials: PropTypes.array,
  handleSelectMaterial: PropTypes.func,
  handleMaterialReset: PropTypes.func,
};

export default MaterialSearch;
