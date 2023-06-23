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
        color: '#48639C', // All colors: 48639C 489C74 9C4894 9C4848 9C8A48
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
            budgets: [],
            theme: 'dark',
            user: {},
            loggedIn: false,
            loadingText: 'Authenticating...',
            fadeOut: false, // Loading text fade
        }
        this.changeBudget = this.changeBudget.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addBudget = this.addBudget.bind(this);
        this.saveBudget = this.saveBudget.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    async componentDidMount() {
        try {
            const checkLogin = await sendData('/auth', {});
            //const checkLogin = {user: {username: 'Dylan', plus: false, budgets: []}, status: 'success' };
            if (checkLogin.status === 'success') {
                const user = checkLogin.user;
                this.setState({
                    user,
                    budgets: user.budgets,
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
    // Once user leaves the dashboard, this saves all unsaved work since the last 10sec save.
    componentWillUnmount() {
        // sendData('/dashboard/saveallbudgets', {
        //     budgets: this.state.user.budgets,
        // });
    }

    // Official change budget function passed. DB saves here.
    changeBudget(budget, db) {
        const budgets = this.state.budgets;
        const index = budgets.findIndex((b) => b.id === budget.id);
        budgets[index] = budget;
        this.setState({
            budgets,
            user: {
                ...this.state.user,
                budgets,
            }
        });
        // Adds the change to the server. The server will save to db every 10 secs.
        this.saveBudget(budget);
    }
    async saveBudget(budget) {

        const response = await sendData('/dashboard/changebudget', {
            budget,
            user: this.state.user,
        });
        if (response.status !== 'success') {
            alert('An error occurred while automatically saving! Please check your internet connection and try again.')
        }

        
    }

    pad(d) {
        return (d < 10) ? '0' + JSON.stringify(d) : JSON.stringify(d);
    }

    async addBudget() {
        const date = new Date();
        const endDate = new Date(Date.now() + 1000*60*60*24*7);
        const newBudget = {
            id: generateId(),
            dateStart: date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate()),
            dateEnd: endDate.getFullYear() + '-' + this.pad(endDate.getMonth() + 1) + '-' + this.pad(endDate.getDate()),
            budgetAmount: "",
            sections: [],
        };
        const currentBudgets = this.state.budgets;
        currentBudgets.unshift(newBudget);
        this.setState({
            budgets: currentBudgets,
        });
        // Add budget in database
        await sendData('/dashboard/addbudget', {
            newBudget,
        });
    }

    // Remove budtget here: async deleteBudget(budget) {}

    render() {
        return this.state.loggedIn ? (
            <div className={`Dashboard ${this.state.loggedIn}`}>

                <div className='topRightBtns'>
                    <div className='addBudget' onClick={this.addBudget}>
                        <img src='/images/plus.svg' alt='add budget plus svg' />
                        Budget
                    </div>
                    <img src='/images/hamMenu.svg' alt='open side menu' className='openMenu' />
                </div>

                <div className='title'>
                    <img src={`/images/titleLogo${this.state.user.plus ? 'Plus':''}.svg`} alt='Budget bucks' />
                </div>

                <div className='budgets'>
                    {this.state.budgets.map((budget, i) => {
                        return (
                            <Budget key={budget.id} budget={budget} changeBudget={this.changeBudget} defaultActive={i===0} theme={this.state.theme} user={this.state.user} />
                        )
                    })}
                    {this.state.budgets.length === 0 ? (
                        <div className='create-a-budget' onClick={this.addBudget}>
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