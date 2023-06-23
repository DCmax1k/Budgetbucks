import React, { Component } from 'react';
import Input from './Input';
import sendData from './util/sendData';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            submitBtnText: 'Log in',
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateUsername(e) {
        this.setState({
            username: e.target.value,
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
            this.setState({
                submitBtnText: 'Loading...',
            });
            const checkLogin = await sendData('/login', {username: this.state.username, password: this.state.password});
            if (checkLogin.status === 'success') {
                return window.location.href = '/dashboard';
            }
            this.setState({
                submitBtnText: 'Log in',
            });
            alert(checkLogin.message);

        } catch(err) {
            console.error(err);
        }
    }

    render() {
        return (
            <div className='Login'>
                <div className='signupTitle'>
                    Log in
                </div>

                <Input type="text" placeholder="Username" onInput={this.updateUsername} value={this.state.username} />
                <Input type="password" placeholder="Password" onInput={this.updatePassword} value={this.state.password} />

                <div className='submitBtn' onClick={this.submit}>
                    {this.state.submitBtnText}
                </div>

                <div className='btn' onClick={() => this.props.changePage('simple')}>
                    Go back
                </div>
            </div>
        )
    }
}

export default Login;