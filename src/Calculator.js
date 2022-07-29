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
];

/* COMBINED CALCULATOR COMPONENT */
class CalculatorApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          currentDisplay: '0',
          currentValue:'0',
          previousDisplay: '',
          previousValue: ''
        };
        this.updateValue = this.updateValue.bind(this)
    };
    updateValue(value){
      this.setState(state =>({
        currentDisplay: state.currentDisplay += value
      }))
    }

    render () {
      return (
        <div>
          <NumberPad 
            updateNumbers={this.updateValue} //Update's the state's value with a number
          />
          <p>{this.state.currentDisplay}</p>
        </div>
        
      )
    }
}

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
            class='button number'
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

export default CalculatorApp;