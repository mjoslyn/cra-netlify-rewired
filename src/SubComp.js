import React, { Component } from "react";
import Loadable from "react-loadable";
import "./App.css";
const LazyCounter = Loadable({
  loader: () => import("./Test.purs"),
  loading: () => <div>Loading...</div>,
  render(loaded, props) {
    let Component = loaded.component;
    return <Component {...props} />;
  }
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <LazyCounter label="HI" />
      </div>
    );
  }
}

export default App;
