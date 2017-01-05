import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <TargetingRules />
    );
  }
}

class TargetingRules extends Component {
  constructor(props) {
    super(props);
    this.state = {rules: 1}
    this.addTargetingRule = this.addTargetingRule.bind(this);
  }
  addTargetingRule(e) {
    this.setState({rules: this.state.rules + 1});
  }
  render(props) {
    var numberOfRules = [];
    for (var i = 0; i < this.state.rules; i++) {
      numberOfRules.push(i);
    }
    return(
      <div className="targetingRules">
        <button className="addRule" onClick={this.addTargetingRule}>Add Targeting Rule</button>
        {numberOfRules.map(function(rule,index){
          return(<TargetingRule key={index}/>);
        })}
      </div>
    );
  }
}

class TargetingRule extends Component {
  constructor(props) {
    super(props);
    this.state = {ruleType: "string"}
    this.updateRule = this.updateRule.bind(this);
  }
  updateRule(e) {
    switch(e.target.className) {
      case "rules":
        this.setState({ruleType: e.target.querySelector(':checked').getAttribute('data-rule-type')});
        break;
      case "operators":
        this.setState({operator: e.target.querySelector(':checked').getAttribute('data-operator')});
        break;
      case "inputs":
        this.setState({ruleType: e.target.querySelector(':checked').getAttribute('data-rule-type')});
        break;
      default:
        break;
    }
  }
  rules(props) {
      return (
        <select className="rules" onChange={this.updateRule}>
          <option data-rule-type="string">String</option>
          <option data-rule-type="location">Location</option>
          <option data-rule-type="integer">Integer</option>
        </select>
      );
  }
  operators(props) {    
    var listOfOperators = [];
    switch(this.state.ruleType){
      case "integer":
        listOfOperators.push("Greater Than","Less Than","Equal To");
        break;
      case "location":
        listOfOperators.push("Within");
        break;     
      default:
        listOfOperators.push("Includes","Does Not Include");
        break;
    }
    return (
        <select className="operators" onChange={this.updateRule}>
          {listOfOperators.map(function(operator,index){
            return <option data-operator={operator.toLowerCase().replace(' ','-')} key={ index }>{operator}</option>
          })}
        </select>
    );
  }
  inputs(props){
    switch(this.state.ruleType){
      case "integer":
        return(
          <input type="number" placeholder="1" name="integer" />
        );
      case "location":
        return(
          <div className="selectLocation">
            <input type="text" placeholder="Anywhere, USA" name="integer" readOnly />
            <button>Select Location</button>
          </div>
        );    
      default:
        return(
          <input type="text" placeholder="String" name="string" />
        );
    }

  }
  render(props) {
    return (
      <div className="targetingRule">
        {this.rules(props)}
        {this.operators(props)}
        {this.inputs(props)}
      </div>
    );
  }
}

export default App;
