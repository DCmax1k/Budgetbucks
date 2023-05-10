import React, { Component } from 'react';
import "./stylesheets/Budget.css";

import BudgetSection from "./BudgetSection";
import EditItem from "./EditItem";
import generateId from './util/generateId';

class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,

            editSection: null,
            editItem: null,
            editActive: false,
            animateItem: null,
        }

        this.changeBudget = this.changeBudget.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.modifyBudget = this.modifyBudget.bind(this);
        this.editItem = this.editItem.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.fixItems = this.fixItems.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.requestRemoveCategory = this.requestRemoveCategory.bind(this);
    }

    toggleActive() {
        this.setState({
            active: !this.state.active,
            editActive: false,
        });
    }

    changeBudget(e) {
        const budget = {...this.props.budget, budgetAmount: e.target.value}
        this.props.changeBudget(budget);
    }

    modifyBudget(budget) {
        this.props.changeBudget(budget);
    }

    editItem(section, item) {
        if (section === null && item === null) {
            this.setState({
                editActive: false,
            });
            setTimeout(() => {
                this.setState({
                    editItem: null,
                });
            }, 300)
        } else {
           this.setState({
                editSection: section,
                editActive: true,
                editItem: item,
            }); 
        }
        
    }

    changeItem(item, sectionKey) {
        const budget = this.props.budget;
        budget.sections[sectionKey].items[item.key] = item;
        this.props.changeBudget(budget);
    }

    addItem(section) {
        const budget = this.props.budget;
        //Fix items
        this.fixItems(budget, section);
        //New item
        const newItem = {
            key: section.items.length,
            name: "",
            price: null,
            date: Date.now(),
            id: generateId(),
        }

        budget.sections[section.key].items.push(newItem);
        this.setState({
            editSection: section,
            editItem: newItem,
            editActive: true,
        });
        this.props.changeBudget(budget);
    }

    deleteItem(section, item) {
        this.editItem(null, null);
        const budget = this.props.budget;

        // First animate item
        this.setState({
            animateItem: item,
        });
        // Actually remove
        setTimeout(() => {
            if (budget.sections[section.key].items.length < 2) {
                budget.sections[section.key].items = [];
            } else {
                budget.sections[section.key].items.splice(item.key, 1);
            }
            
            this.setState({
                animateItem: null,
            });
            this.fixItems(budget, section);
        }, 300);
    }

    fixItems(budget, section) {
        //const budget = this.props.budget;
        //Fix items
        budget.sections[section.key].items = budget.sections[section.key].items.filter(item => item !== null).map((item, i) => {
            return {...item, key: i}
        });
        this.props.changeBudget(budget);
    }
    fixSections(budget) {
        //const budget = this.props.budget;
        //Fix items
        budget.sections = budget.sections.filter(section => section !== null).map((section, i) => {
            return {...section, key: i}
        });
        this.props.changeBudget(budget);
    }

    addCategory() {
        const budget = this.props.budget;
        const newSection = {
            key: budget.sections.length,
            title: "New Category",
            percent: 10,
            items: [],
        }
        budget.sections.push(newSection);
        this.props.changeBudget(budget);
    }

    changeTitle(e) {
        const budget = this.props.budget;
        budget.title = e.target.value;
        this.props.changeBudget(budget);
    }

    requestRemoveCategory(section) {
        if (window.confirm(`Delete "${section.title}"? All items listed in this category will be deleted.`)) {
            this.deleteCategory(section);
        };
        
    }

    deleteCategory(section) {
        const budget = this.props.budget;
        if (budget.sections.length < 2) {
            budget.sections = [];
        } else {
            budget.sections.splice(section.key, 1);
        }
        this.fixSections(this.props.budget);
    }

    render() {
        const budget = this.props.budget;
        let percentUsed = 0;
        this.props.budget.sections.forEach(section => {
            percentUsed+=parseFloat(section.percent);
        });
        if (isNaN(percentUsed)) percentUsed = "";

        return (
            <div className={"Budget " + (this.state.active ? "active" : "")}>
                <div className='dropdown' onClick={this.toggleActive} >
                    <img src='/images/dropdown.svg' alt='dropdown arrow' />
                </div>
                <div className='budgetTitle'>
                    
                    <input type="text" value={budget.title} onInput={this.changeTitle} />
                </div>
                <div className='budgetAmountCont'>
                    Budget: <input type='text' value={budget.budgetAmount} onInput={this.changeBudget} />
                    <div className='percentUsed'>{percentUsed}% used</div>
                </div>

                <div className='sections'>
                    {budget.sections.map((section, k) => {
                        return(
                            <BudgetSection key={section.key} section={section} budget={budget} modifyBudget={this.modifyBudget} editItem={this.editItem} addItem={this.addItem} animateItem={this.state.animateItem} currentItem={this.state.editItem} requestRemoveCategory={this.requestRemoveCategory} />
                        )
                    })}
                    {/* Add section */}
                    <div className='BudgetSection'>
                        <div className='addSection'>
                            Add Category
                            <img src='/images/plusPink.svg' alt='add category' className='pinkPlus' onClick={this.addCategory} />
                        </div>
                    </div>
                </div>
                
                <EditItem active={this.state.editActive} section={this.state.editSection} item={this.state.editItem} changeItem={this.changeItem} editItem={this.editItem} deleteItem={this.deleteItem} />

            </div>
        )
    }
}

export default Budget;