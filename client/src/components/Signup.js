import React, { Component } from 'react';
import Input from './Input';

import sendData from './util/sendData';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }
    updateEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }
    updatePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    async submit() {
        // Check login
        try {
            const checkLogin = await sendData('/login/createaccount', {username: this.state.username, email: this.state.email, password: this.state.password});
            if (checkLogin.status === 'success') {
                return window.location.href = '/dashboard';
            }

            alert(checkLogin.message);

        } catch(err) {
            console.error(err);
        }
    }

    render() {
        return (
            <div className='Signup'>
                <div className='signupTitle'>
                    Sign up!
                </div>

                <Input type="text" placeholder="Username" onInput={this.updateUsername} value={this.state.username} />
                <Input type="text" placeholder="Email" onInput={this.updateEmail} value={this.state.email} />
                <Input type="password" placeholder="Password" onInput={this.updatePassword} value={this.state.password} />

                <div className='passInfo'>
                    <img src='/images/info.svg' /> Password must be 8 characters long including a letter, number, and symbol
                </div>

                <div className='submitBtn' onClick={this.submit}>
                    Start budgeting!
                </div>

                <div className='btn' onClick={() => this.props.changePage('simple')}>
                    Go back
                </div>
            </div>
        )
    }
}

export default Signup;