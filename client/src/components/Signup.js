import React, { Component } from 'react';
import Input from './Input';

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

    submit() {
        alert('submit');
    }

    render() {
        return (
            <div className='Signup'>
                <div className='signupTitle'>
                    Sign up!
                </div>

                <Input placeholder="Username" onInput={this.updateUsername} value={this.state.username} />
                <Input placeholder="Email" onInput={this.updateEmail} value={this.state.email} />
                <Input placeholder="Password" onInput={this.updatePassword} value={this.state.password} />

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