import React, { Component } from 'react';

class Simple extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Simple'>
                budgeting made simple.

                <div className='signupBtn btn' onClick={() => this.props.changePage('signup')}>
                    Sign up
                </div>

                - or -

                <div className='loginBtn btn' onClick={() => this.props.changePage('login')}>
                    Log in
                </div>
            </div>
        )
    }
}

export default Simple;