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
                Coming soon! Navigate to /dashboard to test the app<Link style={{color: "pink"}} to={"/dashboard"}>Dashboard</Link>
                
            </div>
        )
    }
}

export default IndexPage;