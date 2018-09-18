import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from 'react-dom';
import CalcKey from "../components/calckey";
import { bindActionCreators } from "redux";


const DOT_CHAR = '.';
const C_PER = '%';
const C_DIV = '/';
const C_MULT = '*';
const C_MINUS = '-';
const C_PLUS = '+';
const C_EQUAL = '=';

const INITIAL_STATE = {
  displayValue: "0",
  firstValue: null,
  operator: null,
  calcEntered: false,
};


export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  inputDigit(digit) {
    const  { displayValue, calcEntered } = this.state;
    const nextDisplayValue = (calcEntered || displayValue === "0") ? digit : (displayValue + digit);
    this.setState({
      displayValue: nextDisplayValue,
      calcEntered: false
    });
  }

  inputDot() {
    const  { displayValue, calcEntered } = this.state;
    if (displayValue.indexOf(DOT_CHAR) === -1) {
      const nextDisplayValue = calcEntered ? "0" + DOT_CHAR : (displayValue + DOT_CHAR);
      this.setState({
        displayValue: nextDisplayValue,
        calcEntered: false
      });
    }
  }

  clearDisplay() {
    this.setState(INITIAL_STATE);
  }

  toggleNegativeNum() {
    const  { displayValue } = this.state;

    let nextDisplayValue = displayValue;

    if (displayValue.charAt(0) === '-') {
      nextDisplayValue = displayValue.substr(1);
    } else if (displayValue !== '0') {
      nextDisplayValue = '-' + displayValue;
    }

    this.setState({
      displayValue: nextDisplayValue
    });
  }

  inputCalcOperator(calcOperator) {
    const {
      displayValue,
      firstValue,
      secondValue,
      operator,
      calcEntered
    } = this.state;

    const execOperator = {
      [C_DIV]: (firstValue, secondValue) => firstValue / secondValue,
      [C_MULT]: (firstValue, secondValue) => firstValue * secondValue,
      [C_MINUS]: (firstValue, secondValue) => firstValue - secondValue,
      [C_PLUS]: (firstValue, secondValue) => firstValue + secondValue,
      [C_PER]: (firstValue, secondValue) => firstValue * secondValue / 100,
      [C_EQUAL]: (firstValue, secondValue) => secondValue,
    };

    let nextDisplayValue = displayValue;
    let currentValue = parseFloat(displayValue);

    if (!operator) {
      // no previous operator was set
      // same display value which will be the first operand

    } else {

      // there was already an operator set
      // the current display value is the second operand
      // execute the operator, the result is the next display value
      // and it is also the future first operand of the next operator

      if (calcOperator === C_PER) {
        const percentage = execOperator[calcOperator](firstValue, currentValue);
        // it will be the second operand
        nextDisplayValue = String(percentage);
        // reset operation and first operand
        calcOperator = operator;
        currentValue = firstValue;
      } else {
        currentValue = execOperator[operator](firstValue, currentValue);
        nextDisplayValue = String(currentValue);
      }
    }

    this.setState({
      displayValue: nextDisplayValue,
      firstValue: currentValue,
      operator: calcOperator,
      calcEntered: true
    });

  }

  render() {
    const  { displayValue } = this.state;
    return (
<div className="container">

  <div className="row">
    <div className="col-md-4">
    </div>
    <div className="col-md-4">
      <div className="row">
        <div className="title"><h4>React Calculator</h4></div>
      </div>
      <div className="row">
        <div className="display">
        <input
          id="display"
          type="text"
          className="form-control"
          disabled
          placeholder={displayValue}
          title={displayValue}
        />
        </div>
      </div>
      <div className="row">
        <CalcKey onClick={() => this.clearDisplay()} label="AC" className="btn-danger" id="clear" />
        <CalcKey onClick={() => this.toggleNegativeNum()} label="±" id="negative" />
        <CalcKey onClick={() => this.inputCalcOperator(C_PER)} label="%" id="percent" />
        <CalcKey onClick={() => this.inputCalcOperator(C_DIV)} label="÷" id="divide" />
      </div>
      <div className="row">
        <CalcKey onClick={() => this.inputDigit("7")} label="7" id="seven" />
        <CalcKey onClick={() => this.inputDigit("8")} label="8" id="eight" />
        <CalcKey onClick={() => this.inputDigit("9")} label="9" id="nine" />
        <CalcKey onClick={() => this.inputCalcOperator(C_MULT)} label="×" id="multiply" />
      </div>
      <div className="row">
        <CalcKey onClick={() => this.inputDigit("4")} label="4" id="four" />
        <CalcKey onClick={() => this.inputDigit("5")} label="5" id="five" />
        <CalcKey onClick={() => this.inputDigit("6")} label="6" id="six" />
        <CalcKey onClick={() => this.inputCalcOperator(C_MINUS)} label="-" id="subtract" />
      </div>
      <div className="row">
        <CalcKey onClick={() => this.inputDigit("1")} label="1" id="one" />
        <CalcKey onClick={() => this.inputDigit("2")} label="2" id="two" />
        <CalcKey onClick={() => this.inputDigit("3")} label="3" id="three" />
        <CalcKey onClick={() => this.inputCalcOperator(C_PLUS)} className="btn-warning" label="+" id="add" />
      </div>
      <div className="row">
        <CalcKey onClick={() => this.inputDigit("0")} className="zero" label="0" id="zero" />
        <CalcKey onClick={() => this.inputDot()} label="." id="decimal" />
        <CalcKey onClick={() => this.inputCalcOperator(C_EQUAL)} label="=" id="equals" />
      </div>
    </div>
    <div className="col-md-4">
    </div>
  </div>

</div>

    )
  }
}


// function mapStateToProps(state) {
//   // Whatever is returned will show up as props
//   // inside of BookList
//   return {
//     books: state.books
//   };
// }
// // Anything returned from this function will end up as props
// // on the BookList container
// function mapDispatchToProps(dispatch) {
//   // Whenever selectBook is called, the result shoudl be passed
//   // to all of our reducers
//   return bindActionCreators({ selectBook: selectBook }, dispatch);
// }
//
// // Promote BookList from a component to a container - it needs to know
// // about this new dispatch method, selectBook. Make it available
// // as a prop.
// export default connect(mapStateToProps, mapDispatchToProps)(BookList);
