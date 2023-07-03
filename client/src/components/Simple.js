import React, { Component } from 'react';

class Simple extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Simple'>
                budgeting made simple.

                <div className='logBtn btn' onClick={() => this.props.changePage('login')}>
                    Log in
                </div>

                <span className='aboveCreate'>- Don't have an account? -</span>

                <div className='createBtn btn' onClick={() => this.props.changePage('signup')}>
                    Create an account!
                </div>
            </div>
        )
    }
}

export default Simple;