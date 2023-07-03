import React, { Component } from 'react';

import Budget from './Budget';
import "./stylesheets/Dashboard.css";
import sendData from './util/sendData';

import generateId from './util/generateId';
import HamMenu from './HamMenu';

// TESTING BUDGET PLACEHOLDER'
const testBudget = {"id":"1687469594332-177751","dateStart":"2023-06-25","dateEnd":"2023-07-01","budgetAmount":"250","sections":[{"key":0,"title":"Spending","percent":33,"items":[],"id":"1687480329233-120512","color":"#48639C"},{"key":1,"title":"Savings","percent":45,"items":[],"id":"1687483921309-539926","color":"#9C4894"},{"key":2,"title":"Gas","percent":12,"items":[],"id":"1687483934329-712081","color":"#489C74"},{"key":3,"title":"Investment","percent":10,"items":[],"id":"1687483945553-538974","color":"#9C4848"}]}



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
            hamMenu: false,
        }
        this.changeBudget = this.changeBudget.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addBudget = this.addBudget.bind(this);
        this.saveBudget = this.saveBudget.bind(this);
        this.deleteBudget = this.deleteBudget.bind(this);
        this.toggleHamMenu = this.toggleHamMenu.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    async componentDidMount() {
        try {
            const checkLogin = await sendData('/auth', {});
            //const checkLogin = {user: {username: 'DCmax1k', plus: false, budgets: [testBudget], settings: { budgetInterval: 7, copyCategories: true}, email: 'dylan@socialentapp.com',     },status: 'success',};
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

    // Official change budget function passed. DB saves here.
    changeBudget(budget) {
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
        const user = this.state.user;
        const budgetInterval = user.settings.budgetInterval;
        const copyCategories = user.settings.copyCategories;

        let sections = [];
        let budgetAmount = 0;
        if (copyCategories && user.budgets.length > 0) {
            sections = user.budgets[0].sections.map(sec => {
                return { ...sec, items: []};
            });
            budgetAmount = user.budgets[0].budgetAmount;
        }

        const date = new Date();
        const endDate = new Date(Date.now() + 1000*60*60*24*(budgetInterval-1));
        const newBudget = {
            id: generateId(),
            dateStart: date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate()),
            dateEnd: endDate.getFullYear() + '-' + this.pad(endDate.getMonth() + 1) + '-' + this.pad(endDate.getDate()),
            budgetAmount,
            sections,
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

    async deleteBudget(budget) {
        const budgets = this.state.budgets;

        const index = budgets.findIndex(b => b.id === budget.id);
        budgets.splice(index, 1);
        this.setState({
            user: { ...this.state.user, budgets,},
            budgets,
        });

        // Delete in db
        await sendData('/dashboard/deletebudget', {
            budget,
        });
    }

    toggleHamMenu() {
        this.setState({
            hamMenu: !this.state.hamMenu,
        });
    }

    changeUser(user) {
        this.setState({
            user,
        });
    }


    render() {
        return this.state.loggedIn ? (
            <div className={`Dashboard ${this.state.loggedIn}`}>

                <div className='topRightBtns'>
                    <div className='addBudget' onClick={this.addBudget}>
                        <img src='/images/plus.svg' alt='add budget plus svg' />
                        Budget
                    </div>
                    <img onClick={this.toggleHamMenu} src='/images/hamMenu.svg' alt='open side menu' className='openMenu' />
                </div>

                <div className='title'>
                    <img src={`/images/titleLogo${this.state.user.plus ? 'Plus':''}.svg`} alt='Budget bucks' />
                </div>

                <div className='budgets'>
                    {this.state.budgets.map((budget, i) => {
                        return (
                            <Budget key={budget.id} budget={budget} changeBudget={this.changeBudget} defaultActive={i===0} theme={this.state.theme} user={this.state.user} deleteBudget={this.deleteBudget} />
                        )
                    })}
                    {this.state.budgets.length === 0 ? (
                        <div className='create-a-budget' onClick={this.addBudget}>
                            Create a budget!
                        </div>
                    ) : null}
                </div>

                <HamMenu user={this.state.user} closeMenu={this.toggleHamMenu} active={this.state.hamMenu} changeUser={this.changeUser} />
                
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