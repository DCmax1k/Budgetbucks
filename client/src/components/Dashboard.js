import React, { Component } from 'react';

import Budget from './Budget';
import "./stylesheets/Dashboard.css";

// TESTING BUDGET PLACEHOLDER'
const testBudget = {
    title: "May 1 - May 7",
    budgetAmount: 446.50,
    sections: [{
        key: 0,
        title: "Spending",
        percent: 32.1,
        items: [{
            key: 0,
            name: "Magsafe charger phone mount",
            price: 27.74,
            date: 1673252732003,
        }, {
            key: 1,
            name: "Mcdonalds",
            price: 2.00,
            date: 1683223722003,
        }, {
            key: 2,
            name: "DQ",
            price: 3.98,
            date: 1693232722003,
        }],
    }, {
        key: 1,
        title: "Gas",
        percent: 13.3,
        items: [{
            key: 0,
            name: "Circle K",
            price: 35.00,
            date: 1683282722003,
        }],
    }, {
        key: 2,
        title: "Savings",
        percent: 44.6,
        items: [],
    }, {
        key: 3,
        title: "Investment",
        percent: 10,
        items: [],
    }, {
        key: 4,
        title: "Investment",
        percent: 10,
        items: [],
    }],
}
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.user = {};
    }

    floatingIcon() {
        alert("currently still being developed by your top tier engineer");
    }

    render() {
        return (
            <div className="Dashboard">
                <div className='floatingIcon' onClick={this.floatingIcon}>
                    <img src='/images/roundIcon.svg' alt='Icon' />
                </div>

                <div className='title'>
                    <img src='/images/threeLetterLogo.svg' alt='BBS' />
                </div>

                <div className='budgets'>
                    <Budget budget={testBudget} />
                </div>
                
            </div>
        )
    }
}

export default Dashboard;