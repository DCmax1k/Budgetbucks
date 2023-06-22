import React, { Component } from 'react';
import Item from './Item';

class BudgetSection extends Component {

    constructor(props) {
        super(props);

        const { section, budget } = props;
        this.section = section;
        this.budget = budget;

        this.calculateSpent = this.calculateSpent.bind(this);
        this.changePercent = this.changePercent.bind(this);
        this.editItem = this.editItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeItem = this.changeItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    calculateSpent(section) {
        let spent = 0;
        section.items.forEach(item => {
            spent += item.price;
        });
        return spent;
    }

    changePercent(e) {
        const { budget, section } = this.props;
        const newBudget = {...budget};
        let otherPercentUsed = 0;
        budget.sections.forEach(sec => {
            if (sec.id === section.id) return;
            otherPercentUsed+=sec.percent;
        });
        const newValue = parseFloat(e.target.value);
        if (otherPercentUsed + newValue >= 100) {
            newBudget.sections[section.key].percent = 100 - otherPercentUsed;
        } else {
            newBudget.sections[section.key].percent = newValue;
        }
        this.props.modifyBudget(newBudget);
    }

    changeName(e) {
        const { budget, section } = this.props;
        const newBudget = {...budget};
        newBudget.sections[section.key].title = e.target.value;
        this.props.modifyBudget(newBudget);
    }

    addItem(section) {
        this.props.addItem(section);
    }

    calculatePercent(sec, bud) {
        const value = bud.budgetAmount*(sec.percent/100);
        if (isNaN(value)) return "rly? a letter?";
        const spent = parseFloat(value.toFixed(2));
        return isNaN(spent) ? 0 : typeof(spent) !== 'string' ? spent.toFixed(2) : spent.substring(spent.length - 1) === "." ? spent : spent.substring(spent.length - 2) === ".0" ? spent : spent.toFixed(2);
    }

    editItem(section, item) {
        this.props.editItem(section, item);
    }

    changeItem(item, sectionKey) {
        this.props.changeItem(item, sectionKey);
    }

    deleteItem(section, item) {
        this.props.deleteItem(section, item);
    }

    render() {
        const { section, budget } = this.props;
        const spent = this.calculateSpent(section, budget);

        //const spentText = isNaN(spent) ? 0 : typeof(spent) !== 'string' ? spent.toFixed(2) : spent.substring(spent.length - 1) === "." ? spent : spent.substring(spent.length - 2) === ".0" ? spent : spent.toFixed(2);
        const totalText = this.calculatePercent(section, budget);

        const animateItem = this.props.animateItem;
        const currentItem = this.props.currentItem;

        const amountLeft = totalText - spent;

        return (
            <div className="BudgetSection" key={section.key}>
                {/* <div className='percentCont'>
                    <input type='text' className='percent' value={section.percent} onInput={this.changePercent} />
                    &nbsp;%
                </div> */}
                <div className='removeCategory' onClick={() => this.props.requestRemoveCategory(section)} title='Delete category'>
                    <img src='/images/minus.svg' alt='remove category' />
                </div>
                
                <div className='sectionTitle' >
                    <input id={`sectionTitle${section.id}`} type="text" value={section.title} onInput={this.changeName} placeholder='Unnamed' />
    
                </div>

                <div className='percentSlider'>
                    <input type='range' className='slider' value={section.percent} onInput={this.changePercent} min={0} max={100} step={1} />
                </div>

                <div className='percentToAmount'>
                    {section.percent.toFixed(0)}% &nbsp; = &nbsp; ${totalText}
                </div>

                {/* Items */}
                <div className='Items'>
                    {section.items.map((item, k) => {
                    return(
                        <Item key={item.id} budget={budget} section={section} item={item} editItem={this.editItem} changeItem={this.changeItem} animateItem={animateItem === null ? false : animateItem.id === item.id} currentItem={currentItem === null ? false : currentItem.id === item.id} deleteItem={this.deleteItem} />
                    )
                })}
                </div>

                {/* Amount Left / Add item */}
                <div className={`amountLeft ${section.items.length === 0 ? '' : 'active'} ${amountLeft<0 ? 'red' : ''}`}>
                    ${(Math.abs(amountLeft)).toFixed(2)} {amountLeft<0 ? 'OVER BUDGET' : 'LEFT'}
                </div>

                <div className='addItem' onClick={() => {this.addItem(section)}}>
                    <img src="/images/plus.svg" alt='add item' /> Add Item
                </div>

                <div className='rightBorder'></div>
                
                
            </div>
        )
    }
}

export default BudgetSection;