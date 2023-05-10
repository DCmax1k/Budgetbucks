import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./stylesheets/IndexPage.css";

class IndexPage extends Component {

    render() {
        return (
            <div className="IndexPage" style={{color: 'white'}}>
                <div className='titleLogo'>
                    <img  src='/images/titleLogo.svg' alt='Budget Bucks' />
                </div>
                Navigate to /dashboard to test the app, or get there by clicking this link that will magically take you there without having to relad your page: <Link style={{color: "pink"}} to={"/dashboard"}>Dashboard</Link>
                
            </div>
        )
    }
}

export default IndexPage;