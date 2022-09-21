import React from "react";
import { ReactDOM } from "react";

const numberInfo = [
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
    opID:'equals',
    opCode:'=',
    opFunction: ''
  }
  
];

const specialInfo = [
  {
    opID:'negative',
    opCode:'±'
  },
  {
    numID: 'zero',
    numCode: '0',
    numValue: 0,
  },
  {
    opID:'decimal',
    opCode:'.',
    opFunction: ''
  },
  {
    opID: 'clear',
    opCode: 'CE'
  }
]

//Test Expressions
const testNegative = /^-/g, 
      testDecimal = /[.]/g,
      testZeroes = /^[0]$/;

//States
const Awaiting_Input = 'Awaiting_Input',
      Awaiting_Fresh_Input = 'Awaiting_Fresh_Input',
      Receiving_Input = 'Receiving_Input';


/* COMBINED CALCULATOR COMPONENT */
class CalculatorApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          actionState: 'Awaiting_Input',
          currentDisplay: '0',
          currentValue:'0',
          currentOperator: '##',
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
    
      %Adding Input States%
      From what I can tell there should be about 3 states specifically: 1. The state where it's anticipating a fresh input, where it clears the current values upon
      receiving a new input.
      2. The state where it's anticipating a new input after providing an answer, where it clears all previous and current values after receiving one.
      3. The state where upon receiving an initial input, after clearing previous ones from either of the two other states, it will accept more inputs without
      clearing anything, until an operator is pressed
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
            previousValue: curEq.answer.toString(),
            actionState: Awaiting_Fresh_Input 
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
            previousValue: curEq.answer.toString(),
            actionState: Awaiting_Fresh_Input 
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
            previousValue: curEq.answer.toString(),
            actionState: Awaiting_Fresh_Input 
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
            previousValue: curEq.answer.toString(),
            actionState: Awaiting_Fresh_Input 
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
        case 'divide':
        case 'multiply':
          console.log(this.state.previousValue)
        this.setState(state => ({
          currentOperator: opCode,
          bufferedOperator: opID,
          previousValue: state.currentValue,
          previousDisplay: state.currentDisplay,
          actionState: Awaiting_Input
        }));
          break;
        
        case 'subtract':
          if (this.state.bufferedOperator == ''){
            this.setState(state => ({
              currentOperator: opCode,
              bufferedOperator: opID,
              previousValue: state.currentValue,
              previousDisplay: state.currentDisplay,
              actionState: Awaiting_Input
            }))
          } else {
            this.toggleNegative();
          };
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
              currentValue: state.currentValue+= ".",
              actionState: Receiving_Input
            }))
          }
          break;

        default:
          this.performOperator()
      }
    };

    updateValue(value){ //Updates the data values
      switch(this.state.actionState){
        case Awaiting_Input:
          this.setState(state =>({
            currentDisplay:  value.toString(),
            currentValue: value.toString(),
            actionState: Receiving_Input
          }));
          break;

        case Awaiting_Fresh_Input:
          this.initialize()
          this.setState(state =>({
            currentDisplay:  value.toString(),
            currentValue: value.toString(),
            actionState: Receiving_Input
          }));
          break;

        default:
          if(value == 0){
            if(testZeroes.test(this.state.currentValue)){
              //if there is a zero at the beginning do nothing
            } else {
              this.setState(state =>({
                currentDisplay: state.currentDisplay += value,
                currentValue: state.currentValue+= value
              }));
            };
          } else {
            this.setState(state =>({
              currentDisplay: state.currentDisplay += value,
              currentValue: state.currentValue+= value
            }));
          };
          
        };
      }
      
      

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
        <div id='calculator'>
          <div id='showcase'>
            <p id='history'>{this.state.previousDisplay} {this.state.currentOperator}</p>
            <p id='display' className="fs-1 fw-bold">{this.state.currentDisplay}</p>
          </div>
          
          <div>
            Console Logs:<br />
            Display:{this.state.currentDisplay}<br />
            Value:{this.state.currentValue}<br />
            previousDisplay:{this.state.previousDisplay}<br />
            previousValue:{this.state.previousValue}
          </div>
          <div id='buttonContainer'>
            <div id='numpad'>
              <ClearPad
                updateOperator={this.updateOperator}
              />
              <NumberPad 
                updateNumbers={this.updateValue} //Update's the state's value with a number
              />
              <SpecialPad
                updateNumbers={this.updateValue}
                updateOperator={this.updateOperator}
              />
            </div>
            
            <div id='operators'>
              <OperatorPad
                updateOperator={this.updateOperator}
              />
            </div>
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

    return <div id='numbers'>{numPad}</div>
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
  };
};

class SpecialPad extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="specialPad">
        <OperatorButton 
          opID={specialInfo[0].opID} //This is for the negative button
          opCode={specialInfo[0].opCode}
          updateOp={this.props.updateOperator}
        />

        <NumberButton //Zero button
          numberID={specialInfo[1].numID}
          numCode={specialInfo[1].numCode}
          numValue={specialInfo[1].numValue}
          updateNum={this.props.updateNumbers}
        />

        <OperatorButton  //Period(.) button
          opID={specialInfo[2].opID}
          opCode={specialInfo[2].opCode}
          updateOp={this.props.updateOperator}
        />
      </div>
    )
  };
};

class ClearPad extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div id="clearPad">
        <OperatorButton 
          opID={specialInfo[3].opID}
          opCode={specialInfo[3].opCode}
          updateOp={this.props.updateOperator}
        />
      </div>
    )
  };
};
export default CalculatorApp;