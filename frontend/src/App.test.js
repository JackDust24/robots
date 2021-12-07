import { mount, shallow } from "enzyme";

import App from "./App";
import Header from "./components/Header";
import Home from "./routes/Home";
import React from "react";

it("renders without crashing", () => {
  shallow(<App />);
});

describe("App - React components", () => {
  it("renders Account header", () => {
    const wrapper = shallow(<App />);
    const welcome = <h3>Buy Your Favourite Robot</h3>;
    expect(wrapper.contains(welcome)).toEqual(true);
  });
  it("contains a header component", () => {
    expect(shallow(<App />).contains([<Header />])).toEqual(true);
  });
  it("contains a Home component", () => {
    expect(shallow(<App />).contains([<Home />])).toEqual(true);
  });
});
