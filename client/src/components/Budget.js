import React, { Component } from 'react';
import "./stylesheets/Budget.css";

import BudgetSection from "./BudgetSection";
import EditItem from "./EditItem";

class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            budget: props.budget,
            active: false,

            editSection: null,
            editItem: null,
            editActive: false,
        }

        this.changeBudget = this.changeBudget.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.modifyBudget = this.modifyBudget.bind(this);
        this.editItem = this.editItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.fixItems = this.fixItems.bind(this);
    }

    toggleActive() {
        this.setState({
            active: !this.state.active,
            editActive: false,
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

    editItem(section, item) {
        if (section === null && item === null) {
            this.setState({
                editActive: false,
            });
        } else {
           this.setState({
                editSection: section,
                editActive: true,
                editItem: item,
            }); 
        }
        
    }

    changeItem(item, sectionKey) {
        const budget = this.state.budget;
        budget.sections[sectionKey].items[item.key] = item;
        this.setState({
            budget,
        });
    }

    addItem(section) {
        const budget = this.state.budget;
        //Fix items
        this.fixItems(budget, section);
        //New item
        const newItem = {
            key: section.items.length,
            name: "",
            price: null,
            date: new Date().now,
        }

        budget.sections[section.key].items.push(newItem);
        this.setState({
            budget,
            editSection: section,
            editItem: newItem,
            editActive: true,
        });
    }

    deleteItem(section, item) {
        this.editItem(null, null);
        const budget = this.state.budget;
        budget.sections[section.key].items.splice(item.key, 1);
        this.fixItems(budget, section);
    }

    fixItems(budget, section) {
        //const budget = this.state.budget;
        //Fix items
        budget.sections[section.key].items = budget.sections[section.key].items.filter(item => item !== null).map((item, i) => {
            return {...item, key: i}
        });
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
                            <BudgetSection key={section.key} section={section} budget={this.state.budget} modifyBudget={this.modifyBudget} editItem={this.editItem} addItem={this.addItem} />
                        )
                    })}
                </div>
                
                <EditItem active={this.state.editActive} section={this.state.editSection} item={this.state.editItem} changeItem={this.changeItem} editItem={this.editItem} deleteItem={this.deleteItem} />

            </div>
        )
    }
}

export default Budget;