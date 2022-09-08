import React from "react";
import { ReactDOM } from "react";

const numberInfo = [
  {
    numID: 'zero',
    numCode: '0',
    numValue: 0,
  },
  {
    numID: 'one',
    numCode: '1',
    numValue: 1,
  },
  {
    numID: 'two',
    numCode: '2',
    numValue: 2,
  },
  {
    numID: 'three',
    numCode: '3',
    numValue: 3,
  },
  {
    numID: 'four',
    numCode: '4',
    numValue: 4,
  },
  {
    numID: 'five',
    numCode: '5',
    numValue: 5,
  },
  {
    numID: 'six',
    numCode: '6',
    numValue: 6,
  },
  {
    numID: 'seven',
    numCode: '7',
    numValue: 7,
  },
  {
    numID: 'eight',
    numCode: '8',
    numValue: 8,
  },
  {
    numID: 'nine',
    numCode: '9',
    numValue: 9,
  }

];

const operatorInfo = [
  {
    opID:'add',
    opCode: '+',
    opFunction: '' //I might put the functions for these individual functions here rather than the buttons themselves
  },
  {
    opID:'subtract',
    opCode:'-',
    opFunction: ''
  },
  {
    opID:'multiply',
    opCode:'*',
    opFunction: ''
  },
  {
    opID:'divide',
    opCode:'/',
    opFunction: ''
  },
  {
    opID:'decimal',
    opCode:'.',
    opFunction: ''
  },
  {
    opID:'equals',
    opCode:'=',
    opFunction: ''
  },
  {
    opID:'negative',
    opCode:'±'
  },
  {
    opID: 'clear',
    opCode: 'CE'
  }
];

//Test Expressions
const testNegative = /^-/g, 
      testDecimal = /[.]/g,
      testZeroes = /^[0]./;



/* COMBINED CALCULATOR COMPONENT */
class CalculatorApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          currentDisplay: '0',
          currentValue:'0',
          currentOperator: '',
          previousDisplay: '',
          previousValue: '',
          bufferedOperator: '',
          //The lines below, the object here should be used to create a sort of history of equations, that way it can be copied and stored over time
          currentEquation: {
            val1: 0,
            val2: 0,
            fullEq: 0,
            answer: 0
          }
        };
        this.updateValue = this.updateValue.bind(this);
        this.updateOperator = this.updateOperator.bind(this);
        this.initialize = this.initialize.bind(this);
        this.performOperator = this.performOperator.bind(this);
    };

    /* Hello future Dermil, you just spent a while thinking of how to make this calculator perform actions on the values that the user puts and have come up with a solid
      solution. Effectively, you create a script similar to the updateValue() function which would pass the ID of the operator (and action) that needs to be performed
      to this Calculator component. This operater (such as add or subtract) would stored in a delayed action value, and the previous number value would be stored as well
      to allow the user to put in another number value. With both the number values and the assigned operator action, upon hitting the 'equals' operator or ANOTHER
      operator (such as add or divide) the two numbers (previous and current) would be acted upon by the delayed Operator, making way for a new current number AND operator
      
      %NEXT DAY FOLLOW UP%
      What I need now is to create a couple of state for the calculator component itself. Within the initial state, it accepts number inputs up until an Operator is pressed.
      Once an operator is pressed, it goes into another state "AwaitingNextValue" where the current, now previous value is stored while a new value is inputted by the user,
      during this time pressing an operator won't affix a new previous state but simply changes the current and buffered operator function.

      % Creating the decimal function %
      Effectively, I need use ES6 to test the 'currentValue' to see if theres a decimal in there anywhere and if there is, prevent another one from being put in. 
      This should be fairly easy.

      %Creating the Positive/Negative Function%
      Similar to above, with ES6, perform a test to see if there's a - (because positive numbers don't need indicators) at the beginning of the value string and
      if there is, I remove it or add one when the button is pressed. \UPDATE\ I was thinking way too hard about that one, just adding a "-" to the current value
      works just as fine
      */

    performOperator(){ //Lets you perform calculations based on the current operator
      let curEq = Object.assign({},this.state.currentEquation);
      switch(this.state.bufferedOperator){
        case 'add' :
          curEq.val1 = parseFloat(this.state.previousValue)
          curEq.val2 = parseFloat(this.state.currentValue)
          curEq.fullEq =`${curEq.val1} + ${curEq.val2} =`
          curEq.answer = curEq.val1 + curEq.val2
          this.setState(state =>({
            currentDisplay: curEq.answer.toString(),
            previousDisplay: curEq.fullEq,
            currentValue: state.currentValue,
            previousValue: curEq.answer.toString() 
          }))
        break;

        case 'subtract' :
          curEq.val1 = parseFloat(this.state.previousValue)
          curEq.val2 = parseFloat(this.state.currentValue)
          curEq.fullEq =`${curEq.val1} - ${curEq.val2} =`
          curEq.answer = curEq.val1 - curEq.val2
          this.setState(state =>({
            currentDisplay: curEq.answer.toString(),
            previousDisplay: curEq.fullEq,
            currentValue: state.currentValue,
            previousValue: curEq.answer.toString() 
          }))
        break;

        case 'divide' :
          curEq.val1 = parseFloat(this.state.previousValue)
          curEq.val2 = parseFloat(this.state.currentValue)
          curEq.fullEq =`${curEq.val1} / ${curEq.val2} =`
          curEq.answer = curEq.val1 / curEq.val2
          this.setState(state =>({
            currentDisplay: curEq.answer.toString(),
            previousDisplay: curEq.fullEq,
            currentValue: state.currentValue,
            previousValue: curEq.answer.toString() 
          }))
        break;

        case 'multiply' :
          curEq.val1 = parseFloat(this.state.previousValue)
          curEq.val2 = parseFloat(this.state.currentValue)
          curEq.fullEq =`${curEq.val1} x ${curEq.val2} =`
          curEq.answer = curEq.val1 * curEq.val2
          this.setState(state =>({
            currentDisplay: curEq.answer.toString(),
            previousDisplay: curEq.fullEq,
            currentValue: state.currentValue,
            previousValue: curEq.answer.toString() 
          }))
        break;
        
        default:
        break
      }
    };

    toggleNegative(){ //Sets the currently inputed value to negative or positive
      if (testNegative.test(this.state.currentValue)){
        this.setState(state => ({
          currentDisplay: state.currentDisplay.replace(/^-/g, ''),
          currentValue: state.currentValue.replace(/^-/g, '')
        }))
      } else {
        let nVal = "-"
        this.setState({
          currentDisplay: nVal + this.state.currentDisplay,
          currentValue: nVal + this.state.currentValue
        }
        );
      };
    };

    /*This would ID the last operator that was pressed as a button and buffer it until "equals" is pressed or 
      another operator is pressed after a new value is added. After which, the operator function is performed in the function above*/
    updateOperator(opID, opCode){ 
      switch (opID) {
        case 'add':
        case 'subtract':
        case 'divide':
        case 'multiply':
          console.log(this.state.previousValue)
        this.setState(state => ({
          currentOperator: opCode,
          bufferedOperator: opID,
          previousValue: state.currentValue,
          previousDisplay: state.currentDisplay
        }))
          break;
        case 'negative':
          this.toggleNegative()
          break;

        case 'clear':
          this.initialize()
          break;

        case 'decimal':
          if (testDecimal.test(this.state.currentValue)){
            //if true do nothing
          } else {
            this.setState(state =>({
              currentDisplay: state.currentDisplay += ".",
              currentValue: state.currentValue+= "."
            }))
          }
          break;

        default:
          this.performOperator()
      }
    };

    updateValue(value){
      this.setState(state =>({
        currentDisplay: state.currentDisplay += value,
        currentValue: state.currentValue+= value
      }))
    };

    initialize(){
      this.setState({
        currentDisplay: '0',
        currentValue:'0',
        currentOperator: '',
        previousDisplay: '',
        previousValue: '',
        bufferedOperator: '',
        currentEquation: {
          val1: 0,
          val2: 0,
          fullEq: 0,
          answer: 0
        }
      })
    };

    render () {
      return (
        <div>
          <NumberPad 
            updateNumbers={this.updateValue} //Update's the state's value with a number
            
          />
          <OperatorPad
            updateOperator={this.updateOperator}
          />
          <p>{this.state.previousDisplay} {this.state.currentOperator}</p>
          <p id='display'>{this.state.currentDisplay}</p>
          <div>
            Console Logs:<br />
            Display:{this.state.currentDisplay}<br />
            Value:{this.state.currentValue}<br />
            previousDisplay:{this.state.previousDisplay}<br />
            previousValue:{this.state.previousValue}
          </div>
        </div>
        
      )
    };
};

/* INDIVIDUAL NUMBER PAD REACT COMPONENT */
class NumberButton extends React.Component {
    constructor(props){
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.updateNumbers = this.updateNumbers.bind(this);
    };

    componentDidMount(){
        document.addEventListener('keydown',this.handleKeyPress);
      };
  
      componentWillUnmount() {
        document.removeEventListener('keydown',this.handleKeyPress);
      };
  
      handleKeyPress(event) {
        if (event.key === this.props.numCode) {
          this.updateNumbers();
        }
      };


      updateNumbers(){ //adds the value of the button to the display string
        this.props.updateNum(this.props.numValue);
      }

      render() {
        return (
            <button
            id={this.props.numberID}
            class='btn btn-secondary number'
            value={this.props.numValue}
            onClick={this.updateNumbers}
            >
              {this.props.numValue}
            </button>
        )
      }
}

/* THE COMBINED COMPONENT WITH ALL NUMBERS IN THE NUMBERPAD */
class NumberPad extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    let numPad;
    numPad = numberInfo.map((numObj, i, numInfoArr) => {
      return (
        <NumberButton
          numberID={numInfoArr[i].numID}
          numCode={numInfoArr[i].numCode}
          numValue={numInfoArr[i].numValue}
          updateNum={this.props.updateNumbers}
        />
      )
    }
    );

    return <div id='numpad'>{numPad}</div>
  }
}

/* INDIVIDUAL OPERATOR REACT COMPONENT */
class OperatorButton extends React.Component {
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateOperator = this.updateOperator.bind(this);
};

componentDidMount(){
    document.addEventListener('keydown',this.handleKeyPress);
  };

  componentWillUnmount() {
    document.removeEventListener('keydown',this.handleKeyPress);
  };

  handleKeyPress(event) {
    if (event.key === this.props.opCode) {
      this.updateOperator();
    }
  };

  updateOperator(){
    this.props.updateOp(this.props.opID,this.props.opCode)
  }

  render(){
    return(
      <button
        id={this.props.opID}
        onClick={this.updateOperator}
        class="btn btn-primary operator"
      >
        {this.props.opCode}
      </button>
    )
  }

}

class OperatorPad extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let opPad;
    opPad = operatorInfo.map((opObj, i, opInfoArr) => {
      return(
        <OperatorButton
        opID={opInfoArr[i].opID}
        opCode={opInfoArr[i].opCode}  
        updateOp={this.props.updateOperator}
        />
      )
    })

    return <div>{opPad}</div>
    /* return(
      <OperatorButton
      opID={operatorInfo[0].opID}
      opCode={operatorInfo[0].opCode}  
      updateOp={this.props.updateOperator}
      />
    ) */
  };
};
export default CalculatorApp;