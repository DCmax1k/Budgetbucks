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
        const response = await sendData('/login/changeusername', {username});
        if (response.status !== 'success') return alert(response.message);

        const user = this.props.user;
        user.username = username;
        this.props.changeUser(user);
        this.setState({
            newUsername: '',
        });
    }

    inputNewUsername(e) {
        this.setState({
            newUsername: e.target.value,
        });
    }

    async changeEmail(email) {
        const response = await sendData('/login/changeemail', {email});
        if (response.status !== 'success') return alert(response.message);

        const user = this.props.user;
        user.email = email;
        this.props.changeUser(user);
        this.setState({
            newEmail: '',
        });
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
                
                <DropdownDiv classEtc="simpleInput username" icon="person" label="Change username" height={'12vh'}>
                    <input placeholder={user.username} value={this.state.newUsername} onInput={this.inputNewUsername} />
                    <div onClick={() => this.changeUsername(this.state.newUsername)}>
                        Done
                    </div>
                </DropdownDiv>

                <DropdownDiv classEtc="simpleInput email" icon="email" label="Change email" height={'12vh'}>
                    <input placeholder={user.email} value={this.state.newEmail} onInput={this.inputNewEmail} />
                    <div onClick={() => this.changeEmail(this.state.newEmail)}>
                        Done
                    </div>
                </DropdownDiv>

                <DropdownDiv classEtc="settings" icon="settings" label="Settings" height={'20vh'}>
                    {/* <div className='copyCat'>
                        <h4>Copy past categories when creating new budgets</h4>
                        <div className='swtich'></div>
                    </div>
                    <div className='budgetInterval'>
                        <h4>Default budget interval</h4>
                        <div className='otherstuff'></div>
                    </div> */}
                    <div style={{color: 'white'}}>Coming soon.</div>
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