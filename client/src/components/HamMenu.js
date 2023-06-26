import React, { Component } from 'react';

import sendData from './util/sendData';
import DropdownDiv from './DropdownDiv';



class HamMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newUsername: '',
            newEmail: '',
        }

        this.inputNewUsername = this.inputNewUsername.bind(this);
        this.inputNewEmail = this.inputNewEmail.bind(this);

    }

    async changeUsername(username) {
        await sendData('/changeusername', {username});
    }

    inputNewUsername(e) {
        this.setState({
            newUsername: e.target.value,
        });
    }

    async changeUsername(email) {
        await sendData('/changeemail', {email});
    }

    inputNewEmail(e) {
        this.setState({
            newEmail: e.target.value,
        });
    }

    async logout() {
        await sendData('/login/logout', {});
        window.location.href = '/';
    }

    render() {
        const user = this.props.user;
        return (
            <div className={`HamMenu ${this.props.active}`}>

                <div className='heading'>
                    <div className='title'>
                        <img src={`/images/threeLetterLogo${user.plus ? 'Plus':''}.svg`} alt='Budget bucks' />
                        <h2>{user.username}</h2>
                    </div>
                    <div className='closeMenu'>
                        <img onClick={this.props.closeMenu} src='/images/closeMenu.svg' alt='close menu' />
                    </div>
                </div>
                
                <DropdownDiv icon="person" label="Change username">
                    <input placeholder={user.username} value={this.state.newUsername} onInput={this.inputNewUsername} />
                    <div onClick={() => this.changeUsername(this.state.newUsername)}>
                        Done
                    </div>
                </DropdownDiv>

                <DropdownDiv icon="email" label="Change email">
                    <input placeholder={user.email} value={this.state.newEmail} onInput={this.inputNewEmail} />
                    <div onClick={() => this.changeUsername(this.state.newEmail)}>
                        Done
                    </div>
                </DropdownDiv>

                <DropdownDiv icon="settings" label="Settings">
                    
                </DropdownDiv>

                <div onClick={this.logout} className='logout'>
                    Logout
                </div>

                <h4 className='footer'>
                    © 2023 Budget Bucks Dylan Caldwell 
                </h4>
                
            </div>
        )
    }
}

export default HamMenu;