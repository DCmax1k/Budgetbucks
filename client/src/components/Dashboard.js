import React, { Component } from 'react';

import Budget from './Budget';
import "./stylesheets/Dashboard.css";

import generateId from './util/generateId';

// TESTING BUDGET PLACEHOLDER'
const testBudget = {

    title: "May 1 - May 7",
    budgetAmount: 446.50,
    sections: [{
        key: 0,
        title: "Spending",
        percent: 32,
        items: [{
            key: 0,
            name: "New Item",
            price: 0,
            date: Date.now(),
            id: generateId(),
        }],
       }, {
        key: 1,
        title: "Savings",
        percent: 10,
        items: [{
            key: 0,
            name: "Deposit check slip 392",
            price: 35.00,
            date: Date.now(),
            id: generateId(),
        }],
    },// {
    //     key: 2,
    //     title: "Savings",
    //     percent: 44.6,
    //     items: [],
    // }, {
    //     key: 3,
    //     title: "Investment",
    //     percent: 10,
    //     items: [],
    // }, {
    //     key: 4,
    //     title: "Investment",
    //     percent: 10,
    //     items: [],
    // }
],
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
                    <img src='/images/threeLetterLogoPlus.svg' alt='BBS' />
                </div>

                <div className='budgets'>
                    <Budget budget={testBudget} />
                </div>
                
            </div>
        )
    }
}

export default Dashboard;