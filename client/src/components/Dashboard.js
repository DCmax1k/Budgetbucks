import React, { Component } from 'react';

import Budget from './Budget';
import "./stylesheets/Dashboard.css";
import sendData from './util/sendData';

import generateId from './util/generateId';

// TESTING BUDGET PLACEHOLDER'
const testBudget2 = {
    id: generateId(),
    dateStart: '',
    dateEnd: '',
    budgetAmount: 0,
    sections: [],
}
const testBudget = {
    id: generateId(),
    dateStart: '',
    dateEnd: '',
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
        this.state = {
            budgets: [testBudget, testBudget2],
            theme: 'dark',
            user: {},
            loggedIn: false,
            loadingText: 'Authenticating...',
            fadeOut: false, // Loading text fade
        }

        this.changeBudget = this.changeBudget.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        try {
            const checkLogin =await sendData('/auth', {});
            //const checkLogin = {user: {username: 'Dylan'}, status: 'success' };
            if (checkLogin.status === 'success') {
                const user = checkLogin.user;
                this.setState({
                    user,
                    loadingText: 'Welcome back, ' + user.username + '!',
                });
                setTimeout(() => {
                    this.setState({
                        fadeOut: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            loggedIn: true,
                        });
                    }, 300);
                }, 600);
            } else {
                this.setState({
                    loadingText: checkLogin.message,
                });
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }
            

        } catch(err) {
            console.error(err);
        }
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
        return this.state.loggedIn ? (
            <div className={`Dashboard ${this.state.loggedIn}`}>

                <div className='title'>
                    <img src='/images/threeLetterLogoPlus.svg' alt='BBS' />
                </div>

                <div className='budgets'>
                    {this.state.budgets.map((budget, i) => {
                        return (
                            <Budget key={budget.id} budget={budget} changeBudget={this.changeBudget} defaultActive={i===0} theme={this.state.theme} />
                        )
                    })}
                    {this.state.budgets.length === 0 ? (
                        <div>
                            Create a budget!
                        </div>
                    ) : null}
                </div>
                
            </div>
        ) : (
            <div className={`Dashboard ${this.state.loggedIn} ${this.state.fadeOut ? 'fadeOut' : ''}`}>
                <img className='loading' src='/images/loading.svg' alt='loading' />
                {this.state.loadingText}
            </div>
        )
    }
}

export default Dashboard;