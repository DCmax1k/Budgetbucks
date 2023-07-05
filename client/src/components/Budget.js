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

            totalFundsInputWidth: 3 + 1.2*JSON.stringify(props.budget.budgetAmount).length,

            showTrash: false,
        }

        this.itemRefs = [];

        this.colors = ['#48639C', '#489C74', '#9C4894', '#9C4848', '#9C8A48'];
        this.changeBudget = this.changeBudget.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.modifyBudget = this.modifyBudget.bind(this);
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
        this.changeColor = this.changeColor.bind(this);
        this.showTrash = this.showTrash.bind(this);
        this.preDeleteBudget = this.preDeleteBudget.bind(this);
    }


    toggleActive() {
        this.setState({
            active: !this.state.active,
        });
    }

    changeBudget(e) {
        let width = 3 + 1.2*JSON.stringify(e.target.value).length;
        if (width < 3) width = 3;
        this.setState({
            totalFundsInputWidth: width,
        });
        const budget = {...this.props.budget, budgetAmount: e.target.value}
        this.props.changeBudget(budget);
    }

    modifyBudget(budget) {
        this.props.changeBudget(budget);
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
            ref: React.createRef(),
        }

        budget.sections[section.key].items.push(newItem);
        this.props.changeBudget(budget);

        // Aniamte with ref
        setTimeout(() => {
            newItem.ref.current.open();
        }, 325);
    }

    deleteItem(section, item) {
        const budget = this.props.budget;

        if (budget.sections[section.key].items.length < 2) {
            budget.sections[section.key].items = [];
        } else {
            budget.sections[section.key].items.splice(item.key, 1);
        }
        
        this.fixItems(budget, section);
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

    nextColor(lastColor) {
        const index = this.colors.indexOf(lastColor);
        let nextIndex = index+1;
        if (nextIndex >= this.colors.length) nextIndex = 0;
        console.log(nextIndex);
        return this.colors[nextIndex];
    }

    addCategory() {
        const budget = this.props.budget;

        let percent = 10;
        let percentUsed = 0;
        budget.sections.forEach(section => {
            percentUsed+=parseFloat(section.percent);
        });
        percent = 100-percentUsed;
        if (percent > 10) percent = 10;

        let color = this.colors[0];
        if (budget.sections.length !== 0) {
             const lastColor = budget.sections[budget.sections.length - 1].color;
             color = this.nextColor(lastColor);
             console.log(color);
        }

        const newSection = {
            key: budget.sections.length,
            title: "",
            percent,
            items: [],
            id: generateId(),
            color,
        }
        budget.sections.push(newSection);
        this.props.changeBudget(budget);

        //Scroll over
        const doc2 = document.querySelector('.Budget > .sections');
        this.animateScrollOver(doc2, 1);

        setTimeout(() => {
            // Auto select title input
            const location = `sectionTitle${newSection.id}`;
            const doc = document.getElementById(location);
            doc.focus();
        }, 300);
    }
    animateScrollOver(doc, i) {
        if (i >= 100) return;
        console.log(doc.scrollLeft, " ", doc.scrollWidth - 1000);
        doc.scrollLeft = doc.scrollWidth - 500;
        setTimeout(() => {
            this.animateScrollOver(doc, i+1)
        },1);
    }

    changeColor(section, color) {
        const budget = this.props.budget;
        const idx = budget.sections.findIndex(sec => sec.id === section.id);
        budget.sections[idx].color = color;
        this.props.changeBudget(budget);
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
                    case 2:
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

    showTrash() {
        this.setState({
            showTrash: true,
        });
        setTimeout(() => {
            this.setState({
                showTrash: false,
            })
        }, 3000);
    }

    preDeleteBudget(budget) {
        const con = window.confirm('Are you sure you would like to delete this budget?');
        if (con) this.props.deleteBudget(budget);
    }

    render() {
        const budget = this.props.budget;
        let percentUsed = 0;
        budget.sections.forEach(section => {
            percentUsed+=parseFloat(section.percent);
        });
        if (isNaN(percentUsed)) percentUsed = "";

        const showAd = budget.sections.length >= 4 && this.props.user.plus === false;

        return (
            <div className={"Budget " + (this.state.active ? "active" : "")}>
                <div className='dropdown' onClick={this.toggleActive} >
                    <img src='/images/dropdown.svg' alt='dropdown arrow' />
                </div>

                <div className='threeCircles'>
                    <img src='/images/threeCircles.svg' alt='menu' className={`threeCircles ${this.state.showTrash ? 'active' : ''}`} onClick={this.showTrash} />
                    <img src='/images/trash.svg' alt='trash' className={`trash ${this.state.showTrash ? 'active' : ''}`}  onClick={() => this.preDeleteBudget(budget)} />
                    
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
                    Total funds: $<input type='number' value={budget.budgetAmount} onInput={this.changeBudget} placeholder='0' style={{width: `${this.state.totalFundsInputWidth}vh`}} />
                    {/* <div className='percentUsed'>{percentUsed.toFixed(0)}% used</div> */}
                    <div className='colorBar'>
                        {budget.sections.map(sec => {
                            return (
                                <div key={sec.id} title={(sec.title ? sec.title : 'Unamed') + ' - ' + sec.percent + '%'} className='colorFill' style={{width: `${sec.percent}%`, backgroundColor: sec.color}}></div>
                            )
                        })}
                    </div>
                </div>

                <div className='sections'>
                    {budget.sections.map((section, k) => {
                        return(
                            <BudgetSection key={section.key} user={this.props.user} section={section} budget={budget} modifyBudget={this.modifyBudget} addItem={this.addItem} requestRemoveCategory={this.requestRemoveCategory} changeItem={this.changeItem} deleteItem={this.deleteItem} changeColor={this.changeColor} />
                        )
                    })}
                    {/* Add section */}
                    <div className='BudgetSection addSection'>

                        <div className={`addSectionCont ${showAd ? 'plusad' : ''}`} onClick={() => {
                            if (!showAd)this.addCategory();
                            else alert('Budget Bucks Plus is currently private beta only. Coming soon!');
                            }} >
                            <div className={`innerAddSection ${showAd ? 'plusad' : ''}`}>
                                Add Category
                                <img src='/images/plusPink.svg' alt='add category' className='pinkPlus' />
                            </div>

                            <div className={`ad ${showAd ? 'plusad' : ''}`}>
                                <img className='hollowPlus' src='/images/hollowPlus.svg' alt='plus' />
                                <h3>Add more than 4 categories with</h3>
                                <img className='threeLttrPlus' src='/images/threeLetterLogoPlus.svg' alt='logo plus' />
                            </div>

                        </div>

                        

                        <div className='rightBorder'></div>
                    </div>
                    
                </div>
                

            </div>
        )
    }
}

export default Budget;