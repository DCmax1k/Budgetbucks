import React, { Component } from 'react';

import Budget from './Budget';
import "./stylesheets/Dashboard.css";

import generateId from './util/generateId';

// TESTING BUDGET PLACEHOLDER'
const testBudget = {
    id: generateId(),
    title: "May 8 - May 16",
    budgetAmount: 0,
    sections: [
],
}
const testBudget2 = {
    id: generateId(),
    title: "May 1 - May 7",
    budgetAmount: 446.50,
    sections: [{
        key: 0,
        title: "Spending",
        percent: 30,
        id: generateId(),
        items: [{
            key: 0,
            name: "Chick fil a",
            price: 25,
            date: Date.now(),
            id: generateId(),
        }],
    },
],
}



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.user = {};
        this.state = {
            budgets: [testBudget, testBudget2],
        }

        this.changeBudget = this.changeBudget.bind(this);
    }

    floatingIcon() {
        alert("currently still being developed by your top tier engineer");
    }

    changeBudget(budget) {
        const budgets = this.state.budgets;
        const index = budgets.findIndex((b) => b.id === budget.id);
        budgets[index] = budget;
        this.setState({
            budgets,
        });
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
                    {this.state.budgets.map(budget => {
                        return (
                            <Budget key={budget.id} budget={budget} changeBudget={this.changeBudget} />
                        )
                    })}
                </div>
                
            </div>
        )
    }
}

export default Dashboard;