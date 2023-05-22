import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./stylesheets/IndexPage.css";
import Simple from './Simple';
import Signup from './Signup';
import Login from './Login';
import sendData from './util/sendData';

class IndexPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 'simple', // simple is login or signup, signup, login
            animation: false, // If currently animating down
        }
        this.changePage = this.changePage.bind(this);
    }

    async componentDidMount() {
        // Check login
        try {
            const checkLogin = await sendData('/auth', {});
            if (checkLogin.status === 'success') {
                window.location.href = '/dashboard';
            }

        } catch(err) {
            console.error(err);
        }
    }

    changePage(page) {
        this.setState({
            animation: true,
        });
        setTimeout(() => {
            this.setState({
                page,
                animation: false,
            });
        }, 500)
    }

    render() {
        return (
            <div className="IndexPage" style={{color: 'white'}}>
                <div className='titleLogo'>
                    <img  src='/images/titleLogo.svg' alt='Budget Bucks' />
                </div>
                

                {/* Circles */}
                <div className='outterRing'>
                    <img src='/images/roundIcon.svg' alt='dollar sign' />
                    <div className={`middleRing ${this.state.animation}`}>
                        <div className='innerRing'>
                            {this.state.page === 'simple' ? (
                                <Simple changePage={this.changePage} />
                            ) : this.state.page === 'signup' ? (
                                <Signup changePage={this.changePage} />
                            ) : (
                                <Login changePage={this.changePage} />   
                            )}
                        </div>

                    </div>

                </div>
                
            </div>
        )
    }
}

export default IndexPage;