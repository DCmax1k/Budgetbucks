import React, { Component } from 'react';
import "./stylesheets/Budget.css";

import BudgetSection from "./BudgetSection";
import AddItem from "./AddItem";

class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budget: props.budget,
            active: false,
        }

        this.changeBudget = this.changeBudget.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.modifyBudget = this.modifyBudget.bind(this);
    }

    toggleActive() {
        this.setState({
            active: !this.state.active,
        });
    }

    changeBudget(e) {
        this.setState({
            budget: {...this.state.budget, budgetAmount: e.target.value},
        });
    }

    modifyBudget(budget) {
        this.setState({
            budget,
        });
    }

    render() {
        return (
            <div className={"Budget " + (this.state.active ? "active" : "")}>
                <div className='dropdown' onClick={this.toggleActive} >
                    <img src='/images/dropdown.svg' alt='dropdown arrow' />
                </div>
                <div className='budgetTitle'>
                    {this.state.budget.title}
                </div>
                <div className='budgetAmountCont'>
                    Budget: <input type='text' value={this.state.budget.budgetAmount} onInput={this.changeBudget} />
                </div>

                <div className='sections'>
                    {this.state.budget.sections.map((section, k) => {
                        return(
                            <BudgetSection key={section.key} section={section} budget={this.state.budget} modifyBudget={this.modifyBudget} />
                        )
                    })}
                </div>
                
                <AddItem />

            </div>
        )
    }
}

export default Budget;