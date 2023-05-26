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
        this.changeDateStart = this.changeDateStart.bind(this);
        this.changeDateEnd = this.changeDateEnd.bind(this);
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
        }, 305);
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

        setTimeout(() => {
            const location = `sectionTitle${newSection.id}`;
            const doc = document.getElementById(location);
            doc.focus();
        }, 300);
        
        
    }

    changeTitle(e) {
        const budget = this.props.budget;
        budget.title = e.target.value;
        this.props.changeBudget(budget);
    }
    changeDateStart(e) {
        const budget = this.props.budget;
        budget.dateStart = e.target.value;
        this.props.changeBudget(budget);
    }
    changeDateEnd(e) {
        const budget = this.props.budget;
        budget.dateEnd = e.target.value;
        this.props.changeBudget(budget);
    }

    requestRemoveCategory(section) {
        if (section.items.length === 0) return this.deleteCategory(section);
        const check = window.confirm(`Delete "${section.title.length > 0 ? section.title : "Unnamed"}"? All items listed in this category will be deleted.`);
        if (check) {
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
                switch(parseInt(date.split('-')[1])) {
                    case 1:
                        return 'Jan';
                    case 1:
                        return 'Feb';
                    case 3:
                        return 'Mar';
                    case 4:
                        return 'Apr';
                    case 5:
                        return 'May';
                    case 6:
                        return 'Jun';
                    case 7:
                        return 'Jul';
                    case 8:
                        return 'Aug';
                    case 9:
                        return 'Sep';
                    case 10:
                        return 'Oct';
                    case 11:
                        return 'Nov';
                    case 12:
                        return 'Dec';
                    default:
                        return 'Jan';
                }
            case 'd':
                return parseInt(date.split('-')[2]);
            default:
                return parseInt(date.split('-')[0]);
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

                    <div className='dateText'>{this.getDate('m', budget.dateStart)} {this.getDate('d', budget.dateStart)}</div>
                    <DatePicker date={budget.dateStart} changeDate={this.changeDateStart} />
                    
                    &nbsp; <img src='/images/rightArrow.svg' alt='to' /> &nbsp;
                    <div className='dateText'>{this.getDate('m', budget.dateEnd)} {this.getDate('d', budget.dateEnd)}</div>
                    <DatePicker date={budget.dateEnd} changeDate={this.changeDateEnd} />
                    
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