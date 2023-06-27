import React, { Component } from 'react';




class DropdownDiv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            height: '5vh',
        }

        this.toggleActive = this.toggleActive.bind(this);

    }

    toggleActive() {
        this.setState({
            active: !this.state.active,
            height: this.state.height === '5vh' ? this.props.height : '5vh',
        });
    }


    render() {

        return (
            <div className={`DropdownDiv ${this.state.active} ${this.props.classEtc}`} style={{height: this.state.height}}>
                
                <div onClick={this.toggleActive} className='header' >
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