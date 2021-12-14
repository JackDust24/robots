import * as React from "react";

import Header from "./components/Header";
import NewHome from "./routes/NewHome";
import NewHomeCtx from "./routes/NewHomeCtx";
import RobotsContextProvider from './store/robots-context';

function App() {
  return (
    <div className="App">
      <Header />
      <div
        style={{
          padding: `10px 0 0 30px`,
          display: `flex`,
          flexDirection: `row`,
          marginTop: `20px`,
        }}
      >
        <h3>Choose Your Favourite Robot</h3>
        <h5 style={{ padding: `8px`, color: `red` }}>While Stocks last!</h5>
      </div>
      {/* <Home /> */}
      <RobotsContextProvider>
        <NewHomeCtx />
      </RobotsContextProvider>
    </div>
  );
}

export default App;
