import React, { Component } from 'react';
import "./stylesheets/Budget.css";

import BudgetSection from "./BudgetSection";
//import EditItem from "./EditItem";
import generateId from './util/generateId';
import DatePicker from './DatePicker';

class Budget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: this.props.defaultActive,

            editItem: null,
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
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
    }

    toggleActive() {
        this.setState({
            active: !this.state.active,
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
            setTimeout(() => {
                this.setState({
                    editItem: null,
                });
            }, 1)
        } else {
           this.setState({
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
        this.props.changeBudget(budget);
        setTimeout(() => {
            this.setState({
                editItem: newItem,
            });
        }, 302);
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
            title: "",
            percent: 0,
            items: [],
            id: generateId(),
        }
        budget.sections.push(newSection);
        this.props.changeBudget(budget);
    }

    changeTitle(e) {
        const budget = this.props.budget;
        budget.title = e.target.value;
        this.props.changeBudget(budget);
    }
    changeStartDate(e) {
        const budget = this.props.budget;
        budget.startDate = e.target.value;
        this.props.changeBudget(budget);
    }
    changeEndDate(e) {
        const budget = this.props.budget;
        budget.endDate = e.target.value;
        this.props.changeBudget(budget);
    }

    requestRemoveCategory(section) {
        if (window.confirm(`Delete "${section.title.length > 0 ? section.title : "Unnamed"}"? All items listed in this category will be deleted.`)) {
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

    getDate(term, date) {
        if (!date) return term;
        switch(term) {
            case 'm':
                return parseInt(date.substring(5, 7));
            case 'd':
                return parseInt(date.substring(8,10));
            default:
                return term;
        }
        
        
    }

    clickFirstDate() {
        document.getElementById('dateStart').click();
    }
    clickSecondDate() {
        document.getElementById('dateEnd').select();
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
                    
                    {/* <input type="text" value={budget.title} onInput={this.changeTitle} placeholder='Enter budget title...' /> */}

                    <div className='dateText'>{this.getDate('m', budget.startDate)} / {this.getDate('d', budget.startDate)}</div>
                    <DatePicker date={budget.startDate} changeDate={this.changeStartDate} />
                    
                    &nbsp; <img src='/images/rightArrow.svg' alt='to' /> &nbsp;
                    <div className='dateText'>{this.getDate('m', budget.endDate)} / {this.getDate('d', budget.endDate)}</div>
                    <DatePicker date={budget.endDate} changeDate={this.changeEndDate} />
                    
                </div>
                <div className='budgetAmountCont'>
                    Total funds: <input type='text' value={budget.budgetAmount} onInput={this.changeBudget} />
                    <div className='percentUsed'>{percentUsed.toFixed(0)}% used</div>
                </div>

                <div className='sections'>
                    {budget.sections.map((section, k) => {
                        return(
                            <BudgetSection key={section.key} section={section} budget={budget} modifyBudget={this.modifyBudget} editItem={this.editItem} addItem={this.addItem} animateItem={this.state.animateItem} currentItem={this.state.editItem} requestRemoveCategory={this.requestRemoveCategory} changeItem={this.changeItem} deleteItem={this.deleteItem} />
                        )
                    })}
                    {/* Add section */}
                    <div className='BudgetSection addSection'>
                        <div className='innerAddSection' onClick={this.addCategory}>
                            Add Category
                            <img src='/images/plusPink.svg' alt='add category' className='pinkPlus' />
                        </div>

                        <div className='rightBorder'></div>
                    </div>
                    
                </div>
                

            </div>
        )
    }
}

export default Budget;