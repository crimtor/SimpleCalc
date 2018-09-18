import React from "react";
import { Component } from "react";
import Calc from "../containers/calc";

export default class CalcKey extends React.Component {
  render() {
    const {className, label, id} = this.props;
    return (
      <button
        onClick={this.props.onClick}
        type="button"
        className={`btn btn-default ${className}`}
        id={id}>{label}</button>
    );
  }
}
