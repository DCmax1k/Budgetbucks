import React, { Component } from 'react';




class DropdownDiv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
        }

        this.toggleActive = this.toggleActive.bind(this);

    }

    toggleActive() {
        this.setState({
            active: !this.state.active,
        });
    }


    render() {

        return (
            <div className={`DropdownDiv ${this.state.active}`}>
                
                <div className='header' >
                    <div className='menuIcon'>
                        <img className={`i ${this.props.icon}`} src={`/images/${this.props.icon}.svg`} alt='icon' />
                    </div>
                    
                    <h3>{this.props.label}</h3>

                    <img className={`dd ${this.state.active}`} src='/images/dropdown.svg' alt='dropdown arrow' />
                </div>

                <div className='childrenDiv'>
                    {this.props.children}
                </div>

                
            </div>
        )
    }
}

export default DropdownDiv;