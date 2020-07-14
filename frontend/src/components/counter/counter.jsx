import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './counter.css'
class Counter extends Component{
    //Define the initial state in a constructor
    //state => counter 0
    constructor(){
        super();
        this.state = {
            counter: 0
        }
        this.increment = this.increment.bind(this);
        this.reset = this.reset.bind(this);
    }
    render(){
        return (
        <div className="counter">
            <CounterButton incrementMethod={this.increment}></CounterButton>
            <CounterButton by={5} incrementMethod={this.increment}></CounterButton>
            <CounterButton by={10} incrementMethod={this.increment}></CounterButton>
            <span className="count">{this.state.counter}</span>
            <div><button className="reset" onClick={this.reset}>Reset</button></div>
        </div>
        )
        
    }
    increment(by){//Update state => counter++
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + by}
            }
        );
    }
    reset(){
        this.setState(
            {counter: 0}
        )
    }
      
}
class CounterButton extends Component{
    render(){
        return(
            <div>
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+ {this.props.by}</button>
                <button onClick={() => this.props.incrementMethod(-this.props.by)}>- {this.props.by}</button>
            </div>
        )
    }
}

CounterButton.defaultProps = {
    by:1
}
CounterButton.propTypes = {
    by:PropTypes.number
}

export default Counter