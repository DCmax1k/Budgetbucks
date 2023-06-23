import React, { Component } from 'react';
import './stylesheets/Input.css'

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            focused: false,
            type: this.props.type,
        }

        this.input = this.input.bind(this);
        this.toggleType = this.toggleType.bind(this);
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

    toggleType() {
        this.setState({
            type: this.state.type === 'password' ? 'text' : 'password',
        });
    }

    render() {
        return (
            <div className='Input'>
                <div className={`placeholder ${this.state.active}`}>{this.props.placeholder}</div>

                <input type={this.state.type} onInput={this.input} value={this.props.value}/>

                {this.props.type === 'password' ? (
                    <img onClick={this.toggleType} className='passwordEye' src='/images/eye.svg' />
                ) : null}
                

                
            </div>
        )
    }
}

export default Input;