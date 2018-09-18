import React from "react";
import { Component } from "react";

import Calc from "../containers/calc";
import CalcKey from "../components/calckey";
import Header from "../components/header";
import Footer from "../components/footer";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Calc />
        <Footer />
      </div>
    );
  }
}
