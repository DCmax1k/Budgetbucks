import React, { Component } from 'react';
import './stylesheets/Input.css'

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            focused: false,
        }

        this.input = this.input.bind(this);
    }

    determineActive(value) {
        this.setState({
            active: value ? true : false,
        });
    }

    input(e) {
        this.props.onInput(e);
        this.determineActive(e.target.value);
    }

    render() {
        return (
            <div className='Input'>
                <div className={`placeholder ${this.state.active}`}>{this.props.placeholder}</div>

                <input type='text' onInput={this.input} value={this.props.value}/>

                
            </div>
        )
    }
}

export default Input;