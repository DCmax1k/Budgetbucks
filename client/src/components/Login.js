import React, { Component } from 'react';
import Input from './Input';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
        };

        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
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

    submit() {
        alert('submit');
    }

    render() {
        return (
            <div className='Login'>
                <div className='signupTitle'>
                    Log in
                </div>

                <Input placeholder="Username" onInput={this.updateUsername} value={this.state.username} />
                <Input placeholder="Password" onInput={this.updatePassword} value={this.state.password} />

                <div className='submitBtn' onClick={this.submit}>
                    Log in
                </div>

                <div className='btn' onClick={() => this.props.changePage('simple')}>
                    Go back
                </div>
            </div>
        )
    }
}

export default Login;